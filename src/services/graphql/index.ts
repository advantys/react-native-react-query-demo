import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  QueryFunctionContext,
} from 'react-query';
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

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "movies" */
export type Movies = {
  __typename?: 'movies';
  created_at: Scalars['timestamptz'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  ratings: Scalars['Int'];
  storyline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
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
  count: Scalars['Int'];
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
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Movies_Avg_Fields = {
  __typename?: 'movies_avg_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
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
  id?: InputMaybe<Scalars['Int']>;
  ratings?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "movies" */
export type Movies_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']>;
  genre?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  ratings?: InputMaybe<Scalars['Int']>;
  storyline?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Movies_Max_Fields = {
  __typename?: 'movies_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['Int']>;
  storyline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Movies_Min_Fields = {
  __typename?: 'movies_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  genre?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['Int']>;
  storyline?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "movies" */
export type Movies_Mutation_Response = {
  __typename?: 'movies_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
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
  id: Scalars['Int'];
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
  created_at?: InputMaybe<Scalars['timestamptz']>;
  genre?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  ratings?: InputMaybe<Scalars['Int']>;
  storyline?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Movies_Stddev_Fields = {
  __typename?: 'movies_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Movies_Stddev_Pop_Fields = {
  __typename?: 'movies_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Movies_Stddev_Samp_Fields = {
  __typename?: 'movies_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Movies_Sum_Fields = {
  __typename?: 'movies_sum_fields';
  id?: Maybe<Scalars['Int']>;
  ratings?: Maybe<Scalars['Int']>;
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
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Movies_Var_Samp_Fields = {
  __typename?: 'movies_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Movies_Variance_Fields = {
  __typename?: 'movies_variance_fields';
  id?: Maybe<Scalars['Float']>;
  ratings?: Maybe<Scalars['Float']>;
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
  id: Scalars['Int'];
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
  id: Scalars['Int'];
};

export type Query_RootMoviesArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

export type Query_RootMovies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
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
  id: Scalars['Int'];
};

export type Subscription_RootMoviesArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

export type Subscription_RootMovies_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Movies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Movies_Order_By>>;
  where?: InputMaybe<Movies_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
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
  storyline?: Maybe<string>;
  genre?: Maybe<string>;
  ratings: number;
};

export type MoviesQueryVariables = Exact<{
  offset?: Scalars['Int'];
  limit: Scalars['Int'];
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
  id: Scalars['Int'];
}>;

export type MovieDetailsQuery = {
  __typename?: 'query_root';
  movie?: Maybe<{
    __typename?: 'movies';
    id: number;
    title: string;
    storyline?: Maybe<string>;
    genre?: Maybe<string>;
    ratings: number;
  }>;
};

export type UpdateMovieRatingsMutationVariables = Exact<{
  id: Scalars['Int'];
  ratings?: Maybe<Scalars['Int']>;
}>;

export type UpdateMovieRatingsMutation = {
  __typename?: 'mutation_root';
  updateMovie?: Maybe<{
    __typename?: 'movies';
    id: number;
    title: string;
    ratings: number;
  }>;
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
  TError = unknown
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
  TError = unknown
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
  TContext = unknown
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
    'updateMovieRatingsMutation',
    (variables?: UpdateMovieRatingsMutationVariables) =>
      fetcher<UpdateMovieRatingsMutation, UpdateMovieRatingsMutationVariables>(
        client,
        UpdateMovieRatingsMutationDocument,
        variables,
        headers
      )(),
    options
  );
