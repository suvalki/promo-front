import {
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Alert,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useResetPasswordForm } from "../model/useResetPasswordForm";

export const ResetPasswordForm = () => {
  const { form, loading, handleSubmit, hasToken } = useResetPasswordForm();

  if (!hasToken) {
    return (
      <Container size={420} my={40}>
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Ошибка"
          color="red"
          radius="md"
        >
          Токен восстановления не найден. Пожалуйста, запросите восстановление
          пароля заново.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Новый пароль
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Пожалуйста, введите ваш новый пароль
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <PasswordInput
            label="Новый пароль"
            placeholder="Ваш новый пароль"
            required
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            required
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Сохранить пароль
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
