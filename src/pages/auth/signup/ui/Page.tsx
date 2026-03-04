import { Container, Paper, Title, Text, Anchor } from "@mantine/core";
import { SignupForm } from "@/features/auth-by-email";
import { useNavigate } from "react-router";

export const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        Регистрация
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Уже есть аккаунт?{" "}
        <Anchor size="sm" component="button" onClick={() => navigate("/login")}>
          Войти
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <SignupForm />
      </Paper>
    </Container>
  );
};
