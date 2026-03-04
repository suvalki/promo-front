import { NumberInput, Button, Stack } from "@mantine/core";
import { useCreateOrderForm } from "../model/useCreateOrderForm";

export const CreateOrderForm = () => {
  const { form, isLoading, handleSubmit } = useCreateOrderForm();

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
          Создать заказ
        </Button>
      </Stack>
    </form>
  );
};
