import { CheckoutCaptureResponse } from "@chec/commerce.js/types/checkout-capture-response";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";

export const GENERATE_CHECKOUT_TOKEN_LOADING =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_LOADING";
export const GENERATE_CHECKOUT_TOKEN_SUCCESS =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_SUCCESS";
export const GENERATE_CHECKOUT_TOKEN_ERROR =
  "next-ecommerce/checkout/GENERATE_CHECKOUT_TOKEN_ERROR";
export const RESET_CHECKOUT_ERROR =
  "next-ecommerce/checkout/RESET_CHECKOUT_ERROR";
export const CAPTURE_ORDER_SUCCESS =
  "next-ecommerce/checkout/CAPTURE_ORDER_SUCCESS";
export const CAPTURE_ORDER_ERROR =
  "next-ecommerce/checkout/CAPTURE_ORDER_ERROR";

export type Action =
  | GenerateCheckoutTokenLoadingAction
  | GenerateCheckoutTokenSuccessAction
  | GenerateCheckoutTokenErrorAction
  | ResetCheckoutErrorAction
  | CaptureOrderSuccessAction
  | CaptureOrderErrorAction;

export interface GenerateCheckoutTokenLoadingAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_LOADING;
}

export interface GenerateCheckoutTokenSuccessAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_SUCCESS;
  checkoutToken: CheckoutToken;
}

export interface GenerateCheckoutTokenErrorAction {
  readonly type: typeof GENERATE_CHECKOUT_TOKEN_ERROR;
  errorMessage: string;
}

export interface CaptureOrderSuccessAction {
  readonly type: typeof CAPTURE_ORDER_SUCCESS;
  checkoutResponse: CheckoutCaptureResponse;
}

export interface CaptureOrderErrorAction {
  readonly type: typeof CAPTURE_ORDER_ERROR;
  errorMessage: string;
}

export interface ResetCheckoutErrorAction {
  readonly type: typeof RESET_CHECKOUT_ERROR;
}

export interface CheckoutResponseData extends CheckoutCaptureResponse {
  fulfillment?: Fulfillment;
  order?: Order;
}

export interface CheckoutState {
  isLoading: boolean;
  checkoutToken?: CheckoutToken;
  errorMessage?: string;
  checkoutResponse?: CheckoutResponseData;
}

interface Fulfillment {
  physical: Physical;
  digital: Digital;
}

interface Digital {
  downloads: Download[];
}

export interface Download {
  provider: string;
  provider_type: string;
  line_item_id: number;
  product_id: string;
  product_name: string;
  lifespan: Lifespan;
  packages: Package[];
}

interface Lifespan {
  expires: boolean;
  expiry_date: null;
  duration: null;
  period: null;
  download_limit: string;
  human: string;
}

interface Package {
  id: string;
  name: string;
  access_link: string;
  ext: string;
  size: string;
  size_in_bytes: number;
  remaining_downloads: number;
  access_expires: null;
  is_access_revoked: boolean;
  is_unlimited: boolean;
}

interface Physical {
  items: any[];
  shipments: any[];
}

interface Order {
  subtotal: OrderValue;
  total: OrderValue;
  total_with_tax: OrderValue;
  total_paid: OrderValue;
  adjustments: Adjustments;
  pay_what_you_want: PayWhatYouWant;
  shipping: Shipping;
  line_items: LineItem[];
  discount: any[];
  giftcard: any[];
}

interface Adjustments {
  taxable: OrderValue;
  untaxable: OrderValue;
  total: OrderValue;
}

interface OrderValue {
  raw: number;
  formatted: string;
  formatted_with_symbol: FormattedWithSymbol;
  formatted_with_code: FormattedWithCode;
}

enum FormattedWithCode {
  The000Usd = "0.00 USD",
}

enum FormattedWithSymbol {
  The000 = "$0.00",
}

export interface LineItem {
  id: string;
  product_id: string;
  product_name: string;
  product_sku: string;
  quantity: number;
  price: OrderValue;
  line_total: OrderValue;
  line_total_with_tax: OrderValue;
  variant: any[];
  selected_options: any[];
  tax: LineItemTax;
  image: Image;
}

interface Image {
  id: string;
  url: string;
  description: null;
  is_image: boolean;
  filename: string;
  file_size: number;
  file_extension: string;
  image_dimensions: ImageDimensions;
  meta: any[];
  created_at: number;
  updated_at: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

interface LineItemTax {
  is_taxable: boolean;
  amount: OrderValue;
  taxable_amount: OrderValue;
  rate: number;
  rate_percentage: string;
  breakdown: any[];
}

interface PayWhatYouWant {
  enabled: boolean;
  minimum: null;
  customer_set_price: null;
}

interface Shipping {
  id: null;
  description: null;
  provider: null;
  price: OrderValue;
}
