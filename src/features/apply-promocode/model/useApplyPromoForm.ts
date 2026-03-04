import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/entities/order/api";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import type { PaginatedOrderListOutDto } from "@/shared/api/gen/api";

export type OrderItem = NonNullable<PaginatedOrderListOutDto["data"]>[number];

const schema = z.object({
  code: z.string().min(1, "Введите промокод"),
});

export type ApplyPromoFormValues = z.infer<typeof schema>;

export const useApplyPromoForm = (order: OrderItem) => {
  const queryClient = useQueryClient();

  const form = useForm<ApplyPromoFormValues>({
    initialValues: { code: "" },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: ApplyPromoFormValues) =>
      orderApi.applyPromocode(order.id, values.code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      notifications.show({
        title: "Успех",
        message: "Промокод успешно применён",
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
          "Не удалось применить промокод",
        color: "red",
      });
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    handleSubmit: (values: ApplyPromoFormValues) => mutation.mutate(values),
  };
};
