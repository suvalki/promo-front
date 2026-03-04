import {
  AppShell,
  Container,
  Group,
  Tabs,
  Text,
  Button,
  Avatar,
  Menu,
} from "@mantine/core";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useUserStore } from "@/entities/user/model/store";
import { authApi } from "@/entities/user/api/auth";

export const MainLayout = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
    } catch (e) {
      logout();
    }
  };

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size={1200} h="100%">
          <Group justify="space-between" h="100%">
            <Tabs
              value={
                location.pathname === "/"
                  ? "dashboard"
                  : location.pathname.slice(1)
              }
              onChange={(value) =>
                navigate(value === "dashboard" ? "/" : `/${value}`)
              }
            >
              <Tabs.List>
                <Tabs.Tab value="dashboard">Дашборд</Tabs.Tab>
                <Tabs.Tab value="orders">Заказы</Tabs.Tab>
                <Tabs.Tab value="promo">Промокоды</Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Group>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Group style={{ cursor: "pointer" }} gap="xs">
                    <Text size="sm" fw={500}>
                      {user?.name}
                    </Text>
                    <Avatar radius="xl" size="sm" color="blue">
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </Group>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Аккаунт</Menu.Label>
                  <Menu.Item color="red" onClick={handleLogout}>
                    Выйти
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size={1200}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
