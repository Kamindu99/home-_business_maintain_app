export type CoconutMoney = {
  _id?: string;
  depositedDate?: string;
  month?: string;
  totalKg?: string;
  code?: string;
  amount?: string;
  imageUrl?: string;
};

export type PaginationDTO = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
};

export type CoconutMoneyList = {
  pagination?: PaginationDTO;
  result?: CoconutMoney[];
};

export interface CoconutMoneyStateProps {
  coconutMoneyList: CoconutMoneyList | null;
  coconutMoneyFdd: CoconutMoney[] | null;
  error: object | string | null;
  success: object | string | null;
  isLoading: boolean;
}

export interface DefaultRootStateProps {
  coconutMoney: CoconutMoneyStateProps;
}

export interface queryStringParams {
  direction?: string;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  userId?: string;
  isActive?: boolean;
}
