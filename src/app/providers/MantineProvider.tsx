import {
  MantineProvider as BaseMantineProvider,
  createTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import type { ReactNode } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Inter, sans-serif",
});

export const MantineProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BaseMantineProvider theme={theme}>
      <DatesProvider settings={{ locale: "ru", firstDayOfWeek: 1 }}>
        <Notifications position="top-right" />
        <ModalsProvider>{children}</ModalsProvider>
      </DatesProvider>
    </BaseMantineProvider>
  );
};
