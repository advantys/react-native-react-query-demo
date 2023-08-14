import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  timestamptz: { input: any; output: any };
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "movies" */
export type Movies = {
  __typename?: 'movies';
  created_at: Scalars['timestamptz']['output'];
  genre?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ratings: Scalars['Int']['output'];
  storyline?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "movies" */
export type Movies_Aggregate = {
  __typename?: 'movies_aggregate';
  aggregate?: Maybe<Movies_Aggregate_Fields>;
  nodes: Array<Movies>;
};

/** aggregate fields of "movies" */
export type Movies_Aggregate_Fields = {
  __typename?: 'movies_aggregate_fields';
  avg?: Maybe<Movies_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Movies_Max_Fields>;
  min?: Maybe<Movies_Min_Fields>;
  stddev?: Maybe<Movies_Stddev_Fields>;
  stddev_pop?: Maybe<Movies_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Movies_Stddev_Samp_Fields>;
  sum?: Maybe<Movies_Sum_Fields>;
  var_pop?: Maybe<Movies_Var_Pop_Fields>;
  var_samp?: Maybe<Movies_Var_Samp_Fields>;
  variance?: Maybe<Movies_Variance_Fields>;
};

/** aggregate fields of "movies" */
export type Movies_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Movies_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Movies_Avg_Fields = {
  __typename?: 'movies_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "movies". All fields are combined with a logical 'AND'. */
export type Movies_Bool_Exp = {
  _and?: InputMaybe<Array<Movies_Bool_Exp>>;
  _not?: InputMaybe<Movies_Bool_Exp>;
  _or?: InputMaybe<Array<Movies_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  genre?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  ratings?: InputMaybe<Int_Comparison_Exp>;
  storyline?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "movies" */
export enum Movies_Constraint {
  /** unique or primary key constraint */
  MoviesPkey = 'movies_pkey',
}

/** input type for incrementing numeric columns in table "movies" */
export type Movies_Inc_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "movies" */
export type Movies_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Scalars['Int']['input']>;
  storyline?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Movies_Max_Fields = {
  __typename?: 'movies_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  storyline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Movies_Min_Fields = {
  __typename?: 'movies_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  genre?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
  storyline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "movies" */
export type Movies_Mutation_Response = {
  __typename?: 'movies_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Movies>;
};

/** on conflict condition type for table "movies" */
export type Movies_On_Conflict = {
  constraint: Movies_Constraint;
  update_columns?: Array<Movies_Update_Column>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

/** Ordering options when selecting data from "movies". */
export type Movies_Order_By = {
  created_at?: InputMaybe<Order_By>;
  genre?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ratings?: InputMaybe<Order_By>;
  storyline?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: movies */
export type Movies_Pk_Columns_Input = {
  id: Scalars['Int']['input'];
};

/** select columns of table "movies" */
export enum Movies_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Genre = 'genre',
  /** column name */
  Id = 'id',
  /** column name */
  Ratings = 'ratings',
  /** column name */
  Storyline = 'storyline',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "movies" */
export type Movies_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Scalars['Int']['input']>;
  storyline?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Movies_Stddev_Fields = {
  __typename?: 'movies_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Movies_Stddev_Pop_Fields = {
  __typename?: 'movies_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Movies_Stddev_Samp_Fields = {
  __typename?: 'movies_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** aggregate sum on columns */
export type Movies_Sum_Fields = {
  __typename?: 'movies_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  ratings?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "movies" */
export enum Movies_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Genre = 'genre',
  /** column name */
  Id = 'id',
  /** column name */
  Ratings = 'ratings',
  /** column name */
  Storyline = 'storyline',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** aggregate var_pop on columns */
export type Movies_Var_Pop_Fields = {
  __typename?: 'movies_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Movies_Var_Samp_Fields = {
  __typename?: 'movies_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Movies_Variance_Fields = {
  __typename?: 'movies_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "movies" */
  delete_movies?: Maybe<Movies_Mutation_Response>;
  /** delete single row from the table: "movies" */
  delete_movies_by_pk?: Maybe<Movies>;
  /** insert data into the table: "movies" */
  insert_movies?: Maybe<Movies_Mutation_Response>;
  /** insert a single row into the table: "movies" */
  insert_movies_one?: Maybe<Movies>;
  /** update single row of the table: "movies" */
  updateMovie?: Maybe<Movies>;
  /** update data of the table: "movies" */
  update_movies?: Maybe<Movies_Mutation_Response>;
};

/** mutation root */
export type Mutation_RootDelete_MoviesArgs = {
  where: Movies_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Movies_By_PkArgs = {
  id: Scalars['Int']['input'];
};

/** mutation root */
export type Mutation_RootInsert_MoviesArgs = {
  objects: Array<Movies_Insert_Input>;
  on_conflict?: InputMaybe<Movies_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Movies_OneArgs = {
  object: Movies_Insert_Input;
  on_conflict?: InputMaybe<Movies_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdateMovieArgs = {
  _inc?: InputMaybe<Movies_Inc_Input>;
  _set?: InputMaybe<Movies_Set_Input>;
  pk_columns: Movies_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_MoviesArgs = {
  _inc?: InputMaybe<Movies_Inc_Input>;
  _set?: InputMaybe<Movies_Set_Input>;
  where: Movies_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "movies" using primary key columns */
  movie?: Maybe<Movies>;
  /** fetch data from the table: "movies" */
  movies: Array<Movies>;
  /** fetch aggregated fields from the table: "movies" */
  movies_aggregate: Movies_Aggregate;
};

export type Query_RootMovieArgs = {
  id: Scalars['Int']['input'];
};

export type Query_RootMoviesArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

export type Query_RootMovies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "movies" using primary key columns */
  movie?: Maybe<Movies>;
  /** fetch data from the table: "movies" */
  movies: Array<Movies>;
  /** fetch aggregated fields from the table: "movies" */
  movies_aggregate: Movies_Aggregate;
};

export type Subscription_RootMovieArgs = {
  id: Scalars['Int']['input'];
};

export type Subscription_RootMoviesArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

export type Subscription_RootMovies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type MovieFragment = {
  __typename?: 'movies';
  id: number;
  title: string;
  ratings: number;
};

export type MovieDetailsFragment = {
  __typename?: 'movies';
  id: number;
  title: string;
  storyline?: string | null;
  genre?: string | null;
  ratings: number;
};

export type MoviesQueryVariables = Exact<{
  offset?: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;

export type MoviesQuery = {
  __typename?: 'query_root';
  movies: Array<{
    __typename?: 'movies';
    id: number;
    title: string;
    ratings: number;
  }>;
};

export type MovieDetailsQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type MovieDetailsQuery = {
  __typename?: 'query_root';
  movie?: {
    __typename?: 'movies';
    id: number;
    title: string;
    storyline?: string | null;
    genre?: string | null;
    ratings: number;
  } | null;
};

export type UpdateMovieRatingsMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  ratings?: Maybe<Scalars['Int']['input']>;
}>;

export type UpdateMovieRatingsMutation = {
  __typename?: 'mutation_root';
  updateMovie?: {
    __typename?: 'movies';
    id: number;
    title: string;
    ratings: number;
  } | null;
};

export const MovieFragment = `
    fragment movieFragment on movies {
  id
  title
  ratings
}
    `;
export const MovieDetailsFragment = `
    fragment movieDetailsFragment on movies {
  id
  title
  storyline
  genre
  ratings
}
    `;
export const MoviesQueryDocument = `
    query moviesQuery($offset: Int! = 0, $limit: Int!) {
  movies(offset: $offset, limit: $limit, order_by: {id: asc}) {
    ...movieFragment
  }
}
    ${MovieFragment}`;
export const useMoviesQuery = <TData = MoviesQuery, TError = unknown>(
  client: GraphQLClient,
  variables: MoviesQueryVariables,
  options?: UseQueryOptions<MoviesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MoviesQuery, TError, TData>(
    ['moviesQuery', variables],
    fetcher<MoviesQuery, MoviesQueryVariables>(
      client,
      MoviesQueryDocument,
      variables,
      headers
    ),
    options
  );
export const useInfiniteMoviesQuery = <TData = MoviesQuery, TError = unknown>(
  pageParamKey: keyof MoviesQueryVariables,
  client: GraphQLClient,
  variables: MoviesQueryVariables,
  options?: UseInfiniteQueryOptions<MoviesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<MoviesQuery, TError, TData>(
    ['moviesQuery.infinite', variables],
    (metaData) =>
      fetcher<MoviesQuery, MoviesQueryVariables>(
        client,
        MoviesQueryDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const MovieDetailsQueryDocument = `
    query movieDetailsQuery($id: Int!) {
  movie(id: $id) {
    ...movieDetailsFragment
  }
}
    ${MovieDetailsFragment}`;
export const useMovieDetailsQuery = <
  TData = MovieDetailsQuery,
  TError = unknown,
>(
  client: GraphQLClient,
  variables: MovieDetailsQueryVariables,
  options?: UseQueryOptions<MovieDetailsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<MovieDetailsQuery, TError, TData>(
    ['movieDetailsQuery', variables],
    fetcher<MovieDetailsQuery, MovieDetailsQueryVariables>(
      client,
      MovieDetailsQueryDocument,
      variables,
      headers
    ),
    options
  );
export const useInfiniteMovieDetailsQuery = <
  TData = MovieDetailsQuery,
  TError = unknown,
>(
  pageParamKey: keyof MovieDetailsQueryVariables,
  client: GraphQLClient,
  variables: MovieDetailsQueryVariables,
  options?: UseInfiniteQueryOptions<MovieDetailsQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useInfiniteQuery<MovieDetailsQuery, TError, TData>(
    ['movieDetailsQuery.infinite', variables],
    (metaData) =>
      fetcher<MovieDetailsQuery, MovieDetailsQueryVariables>(
        client,
        MovieDetailsQueryDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const UpdateMovieRatingsMutationDocument = `
    mutation updateMovieRatingsMutation($id: Int!, $ratings: Int = 0) {
  updateMovie(pk_columns: {id: $id}, _set: {ratings: $ratings}) {
    ...movieFragment
    id
  }
}
    ${MovieFragment}`;
export const useUpdateMovieRatingsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateMovieRatingsMutation,
    TError,
    UpdateMovieRatingsMutationVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    UpdateMovieRatingsMutation,
    TError,
    UpdateMovieRatingsMutationVariables,
    TContext
  >(
    ['updateMovieRatingsMutation'],
    (variables?: UpdateMovieRatingsMutationVariables) =>
      fetcher<UpdateMovieRatingsMutation, UpdateMovieRatingsMutationVariables>(
        client,
        UpdateMovieRatingsMutationDocument,
        variables,
        headers
      )(),
    options
  );
