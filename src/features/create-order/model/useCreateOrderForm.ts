import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/entities/order/api";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";

const schema = z.object({
  organicCost: z
    .number({ invalid_type_error: "Введите сумму" })
    .positive("Сумма должна быть больше 0"),
});

export type CreateOrderFormValues = z.infer<typeof schema>;

export const useCreateOrderForm = () => {
  const queryClient = useQueryClient();

  const form = useForm<CreateOrderFormValues>({
    initialValues: { organicCost: 0 },
    validate: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (values: CreateOrderFormValues) =>
      orderApi.create({ organicCost: values.organicCost }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["orders"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      notifications.show({
        title: "Успех",
        message: "Заказ успешно создан",
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
          "Не удалось создать заказ",
        color: "red",
      });
    },
  });

  return {
    form,
    isLoading: mutation.isPending,
    handleSubmit: (values: CreateOrderFormValues) => mutation.mutate(values),
  };
};
