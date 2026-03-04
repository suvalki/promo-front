import { Title } from "@mantine/core";
import { UserAnalyticsCard } from "@/widgets/user-analytics-card";

export const DashboardPage = () => {
  return (
    <>
      <Title order={2} mb="lg">
        Дашборд
      </Title>
      <UserAnalyticsCard />
    </>
  );
};
