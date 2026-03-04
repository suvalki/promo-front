import { modals } from "@mantine/modals";
import { createElement } from "react";
import { UpdateOrderForm } from "../ui/UpdateOrderForm";
import type { PaginatedOrderListOutDto } from "@/shared/api/gen/api";

type OrderItem = NonNullable<PaginatedOrderListOutDto["data"]>[number];

export const openUpdateOrderModal = (order: OrderItem) => {
  if (order.promoId) return;
  modals.open({
    title: "Редактировать заказ",
    children: createElement(UpdateOrderForm, { order }),
    size: "sm",
    centered: true,
  });
};
