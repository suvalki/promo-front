import { NumberInput, Button, Stack } from "@mantine/core";
import { useUpdateOrderForm } from "../model/useUpdateOrderForm";
import type { OrderItem } from "../model/useUpdateOrderForm";

interface UpdateOrderFormProps {
  order: OrderItem;
}

export const UpdateOrderForm = ({ order }: UpdateOrderFormProps) => {
  const { form, isLoading, handleSubmit } = useUpdateOrderForm(order);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <NumberInput
          label="Сумма заказа (₽)"
          placeholder="0.00"
          min={0.01}
          decimalScale={2}
          required
          {...form.getInputProps("organicCost")}
        />
        <Button type="submit" fullWidth loading={isLoading}>
          Сохранить изменения
        </Button>
      </Stack>
    </form>
  );
};
