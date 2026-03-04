import { Title, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { PromoTable } from "@/widgets/promo-table";
import { useModals } from "@/app/hooks/useModals";

export const PromoPage = () => {
  const { openCreatePromo } = useModals();

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Промокоды</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={openCreatePromo}>
          Создать промокод
        </Button>
      </Group>
      <PromoTable />
    </>
  );
};
