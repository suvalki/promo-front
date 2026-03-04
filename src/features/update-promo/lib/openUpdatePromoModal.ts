import { modals } from "@mantine/modals";
import { createElement } from "react";
import { UpdatePromoForm } from "../ui/UpdatePromoForm";
import type { PaginatedPromoStatOutDto } from "@/shared/api/gen/api";

type PromoItem = NonNullable<PaginatedPromoStatOutDto["data"]>[number];

export const openUpdatePromoModal = (promo: PromoItem) => {
  modals.open({
    title: "Редактировать промокод",
    children: createElement(UpdatePromoForm, { promo }),
    size: "md",
    centered: true,
  });
};
