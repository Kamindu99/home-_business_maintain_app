export type CoconutHarvest = {
  _id?: string;
  code?: string;
  totalCoconuts?: number;
  name?: string;
};

export type PaginationDTO = {
  page?: number;
  size?: number;
  total?: number;
  totalPages?: number;
};

export type CoconutHarvestList = {
  pagination?: PaginationDTO;
  result?: CoconutHarvest[];
};

export interface CoconutHarvestStateProps {
  coconutHarvestList: CoconutHarvestList | null;
  coconutHarvestFdd: CoconutHarvest[] | null;
  error: object | string | null;
  success: object | string | null;
  isLoading: boolean;
}

export interface DefaultRootStateProps {
  coconutHarvest: CoconutHarvestStateProps;
}

export interface queryStringParams {
  direction?: string;
  page?: number;
  per_page?: number;
  search?: string;
  sort?: string;
  userId?: string;
  date?: string;
  isActive?: boolean;
}
