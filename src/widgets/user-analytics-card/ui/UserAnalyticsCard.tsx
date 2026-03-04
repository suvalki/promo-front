import { Text, Group, SimpleGrid, Paper, Skeleton } from "@mantine/core";
import { useUserAnalytics } from "../model/useUserAnalytics";

export const UserAnalyticsCard = () => {
  const { data, isLoading } = useUserAnalytics();

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
        <Skeleton height={120} radius="md" />
        <Skeleton height={120} radius="md" />
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="md">
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            Всего потрачено
          </Text>
        </Group>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="xl" fw={700}>
            {(data?.totalSpent ?? 0).toLocaleString()} ₽
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mt={7}>
          Суммарная стоимость всех заказов
        </Text>
      </Paper>

      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt="uppercase">
            Всего заказов
          </Text>
        </Group>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="xl" fw={700}>
            {data?.totalOrders ?? 0}
          </Text>
        </Group>
        <Text size="sm" c="dimmed" mt={7}>
          Общее количество оформленных заказов
        </Text>
      </Paper>
    </SimpleGrid>
  );
};
