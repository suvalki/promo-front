import { api } from "@/shared/api/base";
import type {
  OrderControllerFindOwnParams,
  CreateOrderInDto,
  UpdateOrderInDto,
} from "@/shared/api/gen/api";

export const orderApi = {
  findOwn: async (params: OrderControllerFindOwnParams) => {
    return api.orders.orderControllerFindOwn(params);
  },
  create: async (data: CreateOrderInDto) => {
    return api.orders.orderControllerCreate(data);
  },
  update: async (id: string, data: UpdateOrderInDto) => {
    return api.orders.orderControllerUpdate({ id }, data);
  },
  applyPromocode: async (id: string, code: string) => {
    return api.orders.orderControllerApplyPromocode({ id }, { code });
  },
  deactivate: async (id: string) => {
    return api.orders.orderControllerDeactivate({ id });
  },
};
