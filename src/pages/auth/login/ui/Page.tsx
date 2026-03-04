import { Container, Paper, Title, Text, Anchor } from "@mantine/core";
import { LoginForm } from "@/features/auth-by-email";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title ta="center" fw={900}>
        С возвращением!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Еще нет аккаунта?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/signup")}
        >
          Создать аккаунт
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <LoginForm />
      </Paper>
    </Container>
  );
};
