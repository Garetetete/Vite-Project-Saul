export interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

export interface CatBreedsResponse {
  current_page: number;
  data: CatBreed[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

