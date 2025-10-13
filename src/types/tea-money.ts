export type TeaMoney = {
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

export type TeaMoneyList = {
  pagination?: PaginationDTO;
  result?: TeaMoney[];
};

export interface TeaMoneyStateProps {
  teaMoneyList: TeaMoneyList | null;
  teaMoneyFdd: TeaMoney[] | null;
  error: object | string | null;
  success: object | string | null;
  isLoading: boolean;
}

export interface DefaultRootStateProps {
  teaMoney: TeaMoneyStateProps;
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
