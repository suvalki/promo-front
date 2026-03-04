import { modals } from "@mantine/modals";
import { createElement } from "react";
import { CreatePromoForm } from "../ui/CreatePromoForm";

export const openCreatePromoModal = () => {
  modals.open({
    title: "Создать промокод",
    children: createElement(CreatePromoForm),
    size: "md",
    centered: true,
  });
};
