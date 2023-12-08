export class BaseResponseHateoas<T, A = T[]> {
  constructor(
    public readonly _embedded: {
      data: Partial<T> | Partial<A>;
      _links?: HateoasLinksType;
    },
    public readonly _links?: HateoasLinksType,
  ) {}
}

export interface HateoasLinksType {
  self?: {
    href: string;
    description?: string;
    method?: string;
  };
  create?: {
    href: string;
    description?: string;
    method?: string;
  };
  update?: {
    href: string;
    description?: string;
    method?: string;
  };
  delete?: {
    href: string;
    description?: string;
    method?: string;
  };
  [key: string]: any;
}
