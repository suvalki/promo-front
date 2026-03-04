import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoApi } from "@/entities/promo/api";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import type { CreatePromoDto } from "@/shared/api/gen/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const schema = z.object({
  code: z.string().min(1, "Введите код промокода"),
  discount: z
    .number({ invalid_type_error: "Введите скидку" })
    .positive("Скидка должна быть больше 0"),
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
  activeFrom: z
    .string({ invalid_type_error: "Неверный формат даты" })
    .nullable()
    .optional(),
  expiredAt: z
    .string({ invalid_type_error: "Неверный формат даты" })
    .nullable()
    .optional(),
});

export type CreatePromoFormValues = z.infer<typeof schema>;

export const useCreatePromoForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<CreatePromoFormValues>({
    initialValues: {
      code: "",
      discount: 0,
      globalLimit: -1,
      userLimit: -1,
      activeFrom: undefined,
      expiredAt: undefined,
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
      return d.add(1, "day").toISOString();
    }
    return value;
  };

  const mutation = useMutation({
    mutationFn: (values: CreatePromoFormValues) => {
      const dto: CreatePromoDto = {
        code: values.code,
        discount: values.discount,
        globalLimit: prepare(values.globalLimit),
        userLimit: prepare(values.userLimit),
        activeFrom: prepare(values.activeFrom),
        expiredAt: prepare(values.expiredAt),
      };
      return promoApi.create(dto);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["promos"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] });
      notifications.show({
        title: "Успех",
        message: "Промокод успешно создан",
        color: "green",
      });
      modals.closeAll();
    },
    onError: (error: {
      response?: { data?: { error?: { message?: string }; message?: string } };
    }) => {
      notifications.show({
        title: "Ошибка",
        message:
          error.response?.data?.error?.message ??
          error.response?.data?.message ??
          "Не удалось создать промокод",
        color: "red",
      });
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    handleSubmit: (values: CreatePromoFormValues) => mutation.mutate(values),
  };
};
