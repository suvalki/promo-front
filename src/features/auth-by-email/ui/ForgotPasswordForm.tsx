import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Anchor,
  Alert,
} from "@mantine/core";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { Link } from "react-router";
import { useForgotPasswordForm } from "../model/useForgotPasswordForm";

export const ForgotPasswordForm = () => {
  const { form, loading, handleSubmit, isSent } = useForgotPasswordForm();

  if (isSent) {
    return (
      <Container size={420} my={40}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Alert
            variant="light"
            color="green"
            title="Запрос отправлен"
            icon={<IconCheck size={16} />}
            mb="md"
          >
            Если аккаунт с таким email существует, мы отправили на него ссылку
            для восстановления пароля.
          </Alert>
          <Group justify="center">
            <Anchor component={Link} to="/login" size="sm">
              <Group gap={5}>
                <IconArrowLeft size={12} stroke={1.5} />
                <Text size="sm">Вернуться к входу</Text>
              </Group>
            </Anchor>
          </Group>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Забыли пароль?
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Введите ваш email, чтобы получить ссылку для восстановления
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="example@mail.com"
            required
            {...form.getInputProps("email")}
          />
          <Group justify="space-between" mt="lg">
            <Anchor component={Link} to="/login" c="dimmed" size="sm">
              <Group gap={5}>
                <IconArrowLeft size={12} stroke={1.5} />
                <Text size="sm">К авторизации</Text>
              </Group>
            </Anchor>
            <Button type="submit" loading={loading}>
              Сбросить пароль
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};
