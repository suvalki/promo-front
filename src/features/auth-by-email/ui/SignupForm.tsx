import { TextInput, PasswordInput, Button, Stack } from "@mantine/core";
import { useSignupForm } from "../model/useSignupForm";

export const SignupForm = () => {
  const { form, loading, handleSubmit } = useSignupForm();

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Имя"
          placeholder="Иван Иванов"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Телефон"
          placeholder="+79991234567"
          required
          {...form.getInputProps("phone")}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Минимум 6 символов"
          required
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Зарегистрироваться
        </Button>
      </Stack>
    </form>
  );
};
