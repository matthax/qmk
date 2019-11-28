export declare type QueryPrimitive = string | number | boolean;
export declare type QueryParam = QueryPrimitive | QueryPrimitive[];
export declare type QueryParams = {
    [key: string]: QueryParam;
};
export declare type PostData = object | string;

const isQueryPrimitive = (param: QueryParam): param is QueryPrimitive => (!Array.isArray(param));

export const serializeQueryParam = ([key, param]: [string, QueryParam]) => {
    if (isQueryPrimitive(param)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(param)}`;
    }
    return param
        .map((value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

export const getURI = (uri: string, query?: QueryParams) => (
  query ?
    `${uri}?${Object.entries(query)
      .map((pairs) => serializeQueryParam(pairs))
      .join('&')}`
  : uri);

export const serialize = (data?: PostData) => (data ? JSON.stringify(data) : undefined);
