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
  organicCost: z
    .number({ invalid_type_error: "Введите сумму" })
    .positive("Сумма должна быть больше 0"),
});

export type UpdateOrderFormValues = z.infer<typeof schema>;

export const useUpdateOrderForm = (order: OrderItem) => {
  const queryClient = useQueryClient();

  const form = useForm<UpdateOrderFormValues>({
    initialValues: { organicCost: order.organicCost },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: UpdateOrderFormValues) =>
      orderApi.update(order.id, { organicCost: values.organicCost }),
    onMutate: async (values) => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
      const previousData = queryClient.getQueriesData<PaginatedOrderListOutDto>(
        {
          queryKey: ["orders"],
        },
      );
      queryClient.setQueriesData<PaginatedOrderListOutDto>(
        { queryKey: ["orders"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((o) =>
              o.id === order.id ? { ...o, organicCost: values.organicCost } : o,
            ),
          };
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
          "Не удалось обновить заказ",
        color: "red",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      notifications.show({
        title: "Успех",
        message: "Заказ успешно обновлён",
        color: "green",
      });
      modals.closeAll();
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    handleSubmit: (values: UpdateOrderFormValues) => mutation.mutate(values),
  };
};
