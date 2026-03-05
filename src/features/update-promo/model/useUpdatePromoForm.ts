import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoApi } from "@/entities/promo/api";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import type {
  PaginatedPromoStatOutDto,
  UpdatePromoDto,
} from "@/shared/api/gen/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type PromoItem = NonNullable<PaginatedPromoStatOutDto["data"]>[number];

const schema = z.object({
  code: z.string().min(1, "Введите код промокода").optional(),
  discount: z
    .number({ invalid_type_error: "Введите скидку" })
    .positive("Скидка должна быть больше 0")
    .max(100, "Скидка не может быть больше 100")
    .optional(),
  globalLimit: z
    .number({ invalid_type_error: "Введите число" })
    .int("Должно быть целым числом")
    .min(-1, "Минимальное значение -1")
    .optional(),
  userLimit: z
    .number({ invalid_type_error: "Введите число" })
    .int("Должно быть целым числом")
    .min(-1, "Минимальное значение -1")
    .optional(),
  activeFrom: z.union([z.string(), z.date(), z.null()]).optional(),
  expiredAt: z.union([z.string(), z.date(), z.null()]).optional(),
});

export type UpdatePromoFormValues = z.infer<typeof schema>;

export const useUpdatePromoForm = (promo: PromoItem) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdatePromoFormValues>({
    initialValues: {
      code: promo.code,
      discount: promo.discount,
      globalLimit: promo.globalLimit ?? -1,
      userLimit: promo.userLimit ?? -1,
      activeFrom: promo.activeFrom ? dayjs(promo.activeFrom).toDate() : null,
      expiredAt: promo.expiredAt ? dayjs(promo.expiredAt).toDate() : null,
    },
    validate: zodResolver(schema),
  });

  const prepare = (value: any) => {
    if (
      value === 0 ||
      value === -1 ||
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }
    if (
      value instanceof Date ||
      (typeof value === "string" && value.includes("-"))
    ) {
      const d = dayjs(value);
      if (!d.isValid() || d.valueOf() <= 0) return null;
      return d.hour(12).toISOString();
    }
    return value;
  };

  const mutation = useMutation({
    mutationFn: (values: UpdatePromoFormValues) => {
      const dto: UpdatePromoDto = {
        code: values.code,
        discount: values.discount,
        globalLimit: prepare(values.globalLimit),
        userLimit: prepare(values.userLimit),
        activeFrom: prepare(values.activeFrom),
        expiredAt: prepare(values.expiredAt),
      };
      return promoApi.update(promo.id, dto);
    },
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["promos"] });
      const previousData = queryClient.getQueriesData<PaginatedPromoStatOutDto>(
        {
          queryKey: ["promos"],
        },
      );
      queryClient.setQueriesData<PaginatedPromoStatOutDto>(
        { queryKey: ["promos"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((p) =>
              p.id === promo.id
                ? {
                    ...p,
                    code: values.code ?? p.code,
                    discount: values.discount ?? p.discount,
                    globalLimit: prepare(values.globalLimit),
                    userLimit: prepare(values.userLimit),
                    activeFrom: prepare(values.activeFrom),
                    expiredAt: prepare(values.expiredAt),
                  }
                : p,
            ),
          } as PaginatedPromoStatOutDto;
        },
      );
      return { previousData };
    },
    onError: (
      error: {
        response?: {
          data?: { error?: { message?: string }; message?: string };
        };
      },
      _variables,
      context,
    ) => {
      context?.previousData?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.error?.message ??
          error.response?.data?.message ??
          "Не удалось обновить промокод",
        color: "red",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      notifications.show({
        title: "Успех",
        message: "Промокод успешно обновлён",
        color: "green",
      });
      modals.closeAll();
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    handleSubmit: (values: UpdatePromoFormValues) => mutation.mutate(values),
  };
};
