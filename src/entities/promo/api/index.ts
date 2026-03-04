import { api } from "@/shared/api/base";
import type {
  PromoControllerFindOwnParams,
  CreatePromoDto,
  UpdatePromoDto,
} from "@/shared/api/gen/api";

export const promoApi = {
  findOwn: async (params: PromoControllerFindOwnParams) => {
    return api.promo.promoControllerFindOwn(params);
  },
  create: async (data: CreatePromoDto) => {
    return api.promo.promoControllerCreate(data);
  },
  update: async (id: string, data: UpdatePromoDto) => {
    return api.promo.promoControllerUpdate({ id }, data);
  },
  deactivate: async (id: string) => {
    return api.promo.promoControllerDeactivate({ id });
  },
};
