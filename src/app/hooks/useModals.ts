import dayjs from "dayjs";
import { createElement } from "react";

import { ApplyPromoForm } from "@/features/apply-promocode/ui/ApplyPromoForm";
import { CreateOrderForm } from "@/features/create-order/ui/CreateOrderForm";
import { CreatePromoForm } from "@/features/create-promo/ui/CreatePromoForm";
import type { OrderItem } from "@/features/update-order/model/useUpdateOrderForm";
import { UpdateOrderForm } from "@/features/update-order/ui/UpdateOrderForm";
import type { PromoItem } from "@/features/update-promo/model/useUpdatePromoForm";
import { UpdatePromoForm } from "@/features/update-promo/ui/UpdatePromoForm";
import { modals } from "@mantine/modals";

export const useModals = () => {
  const openCreateOrder = () => {
    modals.open({
      title: "Создать заказ",
      children: createElement(CreateOrderForm),
      size: "sm",
      centered: true,
    });
  };

  const openUpdateOrder = (order: OrderItem) => {
    if (order.promoId) return;
    modals.open({
      title: "Редактировать заказ",
      children: createElement(UpdateOrderForm, { order }),
      size: "sm",
      centered: true,
    });
  };

  const openApplyPromo = (order: OrderItem) => {
    modals.open({
      title: "Применить промокод",
      children: createElement(ApplyPromoForm, { order }),
      size: "sm",
      centered: true,
    });
  };

  const openCreatePromo = () => {
    modals.open({
      title: "Создать промокод",
      children: createElement(CreatePromoForm),
      size: "md",
      centered: true,
    });
  };

  const openUpdatePromo = (promo: PromoItem) => {
    modals.open({
      title: "Редактировать промокод",
      children: createElement(UpdatePromoForm, { promo }),
      size: "md",
      centered: true,
    });
  };

  const openDeactivatePromo = (promo: PromoItem, onConfirm: () => void) => {
    modals.openConfirmModal({
      title: "Деактивировать промокод",
      children: `Вы уверены, что хотите деактивировать промокод "${promo.code}"? Это действие необратимо.`,
      labels: { confirm: "Деактивировать", cancel: "Отмена" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm,
    });
  };

  const openDeactivateOrder = (order: OrderItem, onConfirm: () => void) => {
    modals.openConfirmModal({
      title: "Удалить заказ",
      children: `Вы уверены, что хотите удалить заказ от ${dayjs(order.createdAt).format("DD.MM.YYYY HH:mm")} стоимостью ${order.totalCost.toLocaleString()} ₽?`,
      labels: { confirm: "Удалить", cancel: "Отмена" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm,
    });
  };

  return {
    openCreateOrder,
    openUpdateOrder,
    openApplyPromo,
    openDeactivateOrder,
    openCreatePromo,
    openUpdatePromo,
    openDeactivatePromo,
  };
};
