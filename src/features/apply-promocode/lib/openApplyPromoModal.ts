import { modals } from "@mantine/modals";
import { createElement } from "react";
import { ApplyPromoForm } from "../ui/ApplyPromoForm";
import type { PaginatedOrderListOutDto } from "@/shared/api/gen/api";

type OrderItem = NonNullable<PaginatedOrderListOutDto["data"]>[number];

export const openApplyPromoModal = (order: OrderItem) => {
  modals.open({
    title: "Применить промокод",
    children: createElement(ApplyPromoForm, { order }),
    size: "sm",
    centered: true,
  });
};
