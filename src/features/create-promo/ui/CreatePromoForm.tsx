import {
  TextInput,
  NumberInput,
  Button,
  Stack,
  Checkbox,
  Group as MantineGroup,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useCreatePromoForm } from "../model/useCreatePromoForm";

export const CreatePromoForm = () => {
  const { form, isLoading, handleSubmit } = useCreatePromoForm();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Код промокода"
          placeholder="SUMMER2025"
          required
          {...form.getInputProps("code")}
        />
        <NumberInput
          label="Скидка (% или ₽)"
          placeholder="10"
          min={0.01}
          decimalScale={2}
          required
          {...form.getInputProps("discount")}
        />
        <Stack gap={4}>
          <MantineGroup justify="space-between" align="flex-end">
            <NumberInput
              label="Глобальный лимит"
              placeholder="Без ограничений"
              min={-1}
              allowDecimal={false}
              flex={1}
              disabled={form.values.globalLimit === -1}
              {...form.getInputProps("globalLimit")}
              value={
                form.values.globalLimit === -1 ? "" : form.values.globalLimit
              }
            />
            <Checkbox
              mb={8}
              label="Без ограничений"
              checked={form.values.globalLimit === -1}
              onChange={(event) =>
                form.setFieldValue(
                  "globalLimit",
                  event.currentTarget.checked ? -1 : undefined,
                )
              }
            />
          </MantineGroup>
        </Stack>

        <Stack gap={4}>
          <MantineGroup justify="space-between" align="flex-end">
            <NumberInput
              label="Лимит на пользователя"
              placeholder="Без ограничений"
              min={-1}
              allowDecimal={false}
              flex={1}
              disabled={form.values.userLimit === -1}
              {...form.getInputProps("userLimit")}
              value={form.values.userLimit === -1 ? "" : form.values.userLimit}
            />
            <Checkbox
              mb={8}
              label="Без ограничений"
              checked={form.values.userLimit === -1}
              onChange={(event) =>
                form.setFieldValue(
                  "userLimit",
                  event.currentTarget.checked ? -1 : undefined,
                )
              }
            />
          </MantineGroup>
        </Stack>
        <DatePickerInput
          label="Дата начала"
          placeholder="Выберите дату"
          clearable
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("activeFrom")}
        />
        <DatePickerInput
          label="Дата истечения"
          placeholder="Выберите дату"
          clearable
          valueFormat="DD.MM.YYYY"
          {...form.getInputProps("expiredAt")}
        />
        <Button type="submit" fullWidth loading={isLoading}>
          Создать промокод
        </Button>
      </Stack>
    </form>
  );
};
