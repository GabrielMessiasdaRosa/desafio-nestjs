export class BaseResponseHateoas<T> {
  constructor(
    public readonly _embedded: {
      data: Partial<T[]> | Partial<T>;
      _links?: HateoasLinksType;
      [key: string]: any;
    },
    public readonly _links?: HateoasLinksType,
  ) {}
}

export type HateoasLinksType = {
  [key: string]: {
    [key: string]: string;
  };
};
