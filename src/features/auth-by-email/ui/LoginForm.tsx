import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Anchor,
} from "@mantine/core";
import { useLoginForm } from "../model/useLoginForm";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { form, loading, handleSubmit } = useLoginForm();
  const navigate = useNavigate();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Ваш пароль"
          required
          {...form.getInputProps("password")}
        />
        <Group justify="flex-end">
          <Anchor
            component="button"
            type="button"
            size="sm"
            onClick={() => navigate("/forgot-password")}
          >
            Забыли пароль?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="md" loading={loading}>
          Войти
        </Button>
      </Stack>
    </form>
  );
};
