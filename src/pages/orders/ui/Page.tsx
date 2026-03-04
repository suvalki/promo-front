import { Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { OrderTable } from "@/widgets/order-table";
import { useModals } from "@/app/hooks/useModals";

export const OrdersPage = () => {
  const { openCreateOrder } = useModals();

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Заказы</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={openCreateOrder}>
          Создать заказ
        </Button>
      </Group>
      <OrderTable />
    </>
  );
};
