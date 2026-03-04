import { TextInput, Button, Stack, Text } from "@mantine/core";
import { useApplyPromoForm } from "../model/useApplyPromoForm";
import type { OrderItem } from "../model/useApplyPromoForm";

interface ApplyPromoFormProps {
  order: OrderItem;
}

export const ApplyPromoForm = ({ order }: ApplyPromoFormProps) => {
  const { form, isLoading, handleSubmit } = useApplyPromoForm(order);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Text size="sm" c="dimmed">
          Заказ #{order.id.slice(0, 8)}... —{" "}
          {order.organicCost.toLocaleString()} ₽
        </Text>
        <TextInput
          label="Промокод"
          placeholder="Введите промокод"
          required
          {...form.getInputProps("code")}
        />
        <Button type="submit" fullWidth loading={isLoading}>
          Применить промокод
        </Button>
      </Stack>
    </form>
  );
};
