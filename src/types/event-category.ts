export interface Category {
  id: number;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetEventCategoriesQuery {
  page?: number;
  take?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    total: number;
  };
}

export interface CreateCategoryPayload {
  name: string;
  description: string;
}
