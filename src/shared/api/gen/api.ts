/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AnalyticsUserOutDto {
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string | null;
  email: string;
  id: string;
  name: string;
  phone?: string | null;
  totalOrders: number;
  totalSpent: number;
}

export interface ApplyPromoInDto {
  /**
   * Promo code to apply
   * @minLength 1
   */
  code: string;
}

export interface AuthInDto {
  /**
   * User email address
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /**
   * User password
   * @minLength 6
   */
  password: string;
}

export interface AuthOutDto {
  /**
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  id: string;
  name: string;
  phone: string;
}

export interface CreateOrderInDto {
  /**
   * Original cost of the order before promo code
   * @exclusiveMin 0
   */
  organicCost: number;
}

export interface CreatePromoDto {
  /**
   * Date when the promo code becomes active
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  activeFrom?: string;
  /**
   * Unique promo code string
   * @minLength 1
   */
  code: string;
  /**
   * Discount amount or percentage
   * @exclusiveMin 0
   */
  discount: number;
  /**
   * Date when the promo code expires
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  expiredAt?: string;
  /**
   * Total number of times the promo code can be used globally
   * @min 0
   * @max 9007199254740991
   * @default 100
   */
  globalLimit?: number;
  /**
   * Number of times the promo code can be used per user
   * @min 0
   * @max 9007199254740991
   * @default 1
   */
  userLimit?: number;
}

export interface ForgotPasswordDto {
  /**
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
}

export interface ForgotPasswordOutDto {
  message: string;
  token?: string;
}

export interface OrderControllerApplyPromocodeParams {
  id: string;
}

export interface OrderControllerDeactivateParams {
  id: string;
}

export interface OrderControllerFindOwnParams {
  dateFrom?: string | null;
  dateTo?: string | null;
  /**
   * @min 1
   * @max 9007199254740991
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 100
   * @default 10
   */
  pageSize?: number;
  search?: string | null;
  sortBy?: string;
  /** @default "DESC" */
  sortOrder?: "ASC" | "DESC" | "asc" | "desc";
}

export interface OrderControllerUpdateParams {
  id: string;
}

export interface OrderOutDto {
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string | null;
  id: string;
  organicCost: number;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  updatedAt: string | null;
}

export interface PaginatedOrderListOutDto {
  data: {
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    createdAt: string;
    id: string;
    organicCost: number;
    promoCode?: string | null;
    promoDiscount?: number | null;
    promoId?: string | null;
    totalCost: number;
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    updatedAt: string;
    userEmail: string;
    userId: string;
    userName: string;
    userPhone: string;
  }[];
  /** @default 1 */
  page?: number;
  /** @default 10 */
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
}

export interface PaginatedPromoStatOutDto {
  data: {
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    activeFrom: string | null;
    code: string;
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    createdAt: string | null;
    discount: number;
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    expiredAt: string | null;
    globalLimit: number;
    id: string;
    /**
     * @format date-time
     * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
     */
    inactiveAt: string | null;
    usageCount: number;
    userLimit: number;
  }[];
  /** @default 1 */
  page?: number;
  /** @default 10 */
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
}

export interface PromoControllerDeactivateParams {
  id: string;
}

export interface PromoControllerFindOwnParams {
  dateFrom?: string | null;
  dateTo?: string | null;
  /**
   * @min 1
   * @max 9007199254740991
   * @default 1
   */
  page?: number;
  /**
   * @min 1
   * @max 100
   * @default 10
   */
  pageSize?: number;
  search?: string | null;
  sortBy?: string;
  /** @default "DESC" */
  sortOrder?: "ASC" | "DESC" | "asc" | "desc";
}

export interface PromoControllerUpdateParams {
  id: string;
}

export interface PromoOutDto {
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  activeFrom: string | null;
  code: string;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string | null;
  discount: number;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  expiredAt: string | null;
  globalLimit: number;
  id: string;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  inactiveAt: string | null;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  updatedAt: string | null;
  userLimit: number;
}

export interface ResetPasswordDto {
  /** @minLength 6 */
  password: string;
  token: string;
}

export interface SignupDto {
  /**
   * User email address
   * @format email
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /**
   * User full name
   * @minLength 2
   */
  name: string;
  /**
   * User password
   * @minLength 6
   */
  password: string;
  /**
   * User international phone number
   * @pattern ^\+?[1-9]\d{1,14}$
   */
  phone: string;
}

export interface UpdateOrderInDto {
  /** @exclusiveMin 0 */
  organicCost: number;
}

export interface UpdatePromoDto {
  /**
   * Date when the promo code becomes active
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  activeFrom?: string;
  /**
   * Unique promo code string
   * @minLength 1
   */
  code?: string;
  /**
   * Discount amount or percentage
   * @exclusiveMin 0
   */
  discount?: number;
  /**
   * Date when the promo code expires
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  expiredAt?: string;
  /**
   * Total number of times the promo code can be used globally
   * @min 0
   * @max 9007199254740991
   * @default 100
   */
  globalLimit?: number;
  /**
   * Number of times the promo code can be used per user
   * @min 0
   * @max 9007199254740991
   * @default 1
   */
  userLimit?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { "Content-Type": type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Promo API
 * @version 1.0
 * @contact
 *
 * The Promo API description
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerForgotPassword
     * @summary Request password reset token
     * @request POST:/auth/forgot-password
     */
    authControllerForgotPassword: (
      data: ForgotPasswordDto,
      params: RequestParams = {},
    ) =>
      this.http.request<ForgotPasswordOutDto, any>({
        path: `/auth/forgot-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @summary Log in and get session cookie
     * @request POST:/auth/login
     */
    authControllerLogin: (data: AuthInDto, params: RequestParams = {}) =>
      this.http.request<AuthOutDto, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogout
     * @summary Log out user
     * @request POST:/auth/logout
     * @secure
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.http.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerMe
     * @summary Get current user
     * @request GET:/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.http.request<AuthOutDto, any>({
        path: `/auth/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPassword
     * @summary Reset password with token
     * @request POST:/auth/reset-password
     */
    authControllerResetPassword: (
      data: ResetPasswordDto,
      params: RequestParams = {},
    ) =>
      this.http.request<void, any>({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerSignup
     * @summary Register a new user
     * @request POST:/auth/signup
     */
    authControllerSignup: (data: SignupDto, params: RequestParams = {}) =>
      this.http.request<AuthOutDto, any>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerApplyPromocode
     * @summary Apply a promocode to an order
     * @request POST:/orders/{id}/apply-promocode
     * @secure
     */
    orderControllerApplyPromocode: (
      { id, ...query }: OrderControllerApplyPromocodeParams,
      data: ApplyPromoInDto,
      params: RequestParams = {},
    ) =>
      this.http.request<OrderOutDto, any>({
        path: `/orders/${id}/apply-promocode`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerCreate
     * @summary Create a new order
     * @request POST:/orders
     * @secure
     */
    orderControllerCreate: (
      data: CreateOrderInDto,
      params: RequestParams = {},
    ) =>
      this.http.request<OrderOutDto, any>({
        path: `/orders`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerDeactivate
     * @summary Deactivate an order
     * @request DELETE:/orders/{id}
     * @secure
     */
    orderControllerDeactivate: (
      { id, ...query }: OrderControllerDeactivateParams,
      params: RequestParams = {},
    ) =>
      this.http.request<OrderOutDto, any>({
        path: `/orders/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerFindOwn
     * @summary List user orders
     * @request GET:/orders
     * @secure
     */
    orderControllerFindOwn: (
      query: OrderControllerFindOwnParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PaginatedOrderListOutDto, any>({
        path: `/orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Orders
     * @name OrderControllerUpdate
     * @summary Update an existing order
     * @request PATCH:/orders/{id}
     * @secure
     */
    orderControllerUpdate: (
      { id, ...query }: OrderControllerUpdateParams,
      data: UpdateOrderInDto,
      params: RequestParams = {},
    ) =>
      this.http.request<OrderOutDto, any>({
        path: `/orders/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  promo = {
    /**
     * No description
     *
     * @tags Promo
     * @name PromoControllerCreate
     * @summary Create a new promo code
     * @request POST:/promo
     * @secure
     */
    promoControllerCreate: (data: CreatePromoDto, params: RequestParams = {}) =>
      this.http.request<PromoOutDto, any>({
        path: `/promo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name PromoControllerDeactivate
     * @summary Deactivate promo code by ID
     * @request DELETE:/promo/{id}
     * @secure
     */
    promoControllerDeactivate: (
      { id, ...query }: PromoControllerDeactivateParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PromoOutDto, any>({
        path: `/promo/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name PromoControllerFindOwn
     * @summary Find user promo codes with statistics
     * @request GET:/promo
     * @secure
     */
    promoControllerFindOwn: (
      query: PromoControllerFindOwnParams,
      params: RequestParams = {},
    ) =>
      this.http.request<PaginatedPromoStatOutDto, any>({
        path: `/promo`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Promo
     * @name PromoControllerUpdate
     * @summary Update promo code by ID
     * @request PATCH:/promo/{id}
     * @secure
     */
    promoControllerUpdate: (
      { id, ...query }: PromoControllerUpdateParams,
      data: UpdatePromoDto,
      params: RequestParams = {},
    ) =>
      this.http.request<PromoOutDto, any>({
        path: `/promo/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  analytics = {
    /**
     * No description
     *
     * @tags Analytics
     * @name AnalyticsControllerGetMe
     * @summary get current user analytics
     * @request GET:/analytics/me
     * @secure
     */
    analyticsControllerGetMe: (params: RequestParams = {}) =>
      this.http.request<AnalyticsUserOutDto, any>({
        path: `/analytics/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
