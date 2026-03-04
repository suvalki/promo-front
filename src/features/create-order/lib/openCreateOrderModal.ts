import { modals } from "@mantine/modals";
import { createElement } from "react";
import { CreateOrderForm } from "../ui/CreateOrderForm";

export const openCreateOrderModal = () => {
  modals.open({
    title: "Создать заказ",
    children: createElement(CreateOrderForm),
    size: "sm",
    centered: true,
  });
};
