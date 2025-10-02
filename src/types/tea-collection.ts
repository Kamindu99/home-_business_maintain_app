export type Bookstransfer = {
  _id?: string;
  collectedDate?: string;
  subTotalKg?: string;
  totalKg?: string;
  code?: string;
};

export type PaginationDTO = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
};

export type BookstransferList = {
  pagination?: PaginationDTO;
  result?: Bookstransfer[];
};

export interface BookStateProps {
  bookstransferList: BookstransferList | null;
  bookstransferFdd: Bookstransfer[] | null;
  error: object | string | null;
  success: object | string | null;
  isLoading: boolean;
}

export interface DefaultRootStateProps {
  booktransfer: BookStateProps;
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
