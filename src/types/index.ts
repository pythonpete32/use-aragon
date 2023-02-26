import { DaoListItem, DaoDetails, AssetBalance, Transfer, GasFeeEstimation } from "@aragon/sdk-client";
import { DaoDepositStepValue, DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import {
  QueryKey,
  QueryObserverResult,
  QueryOptions,
  QueryStatus,
  RefetchOptions,
  UseMutateFunction,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

export interface BaseQueryResultData<TData> {
  data: TData | undefined;
  error?: unknown;
  status: QueryStatus;
  dataUpdatedAt: number;
  errorUpdatedAt: number;
  failureCount: number;
  isError: boolean;
  isFetched: boolean;
  isFetchedAfterMount: boolean;
  isLoadingError: boolean;
  isPlaceholderData: boolean;
  isPreviousData: boolean;
  isRefetchError: boolean;
  isStale: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TData, unknown>>;
  remove: () => void;
}

export type Address = string;

export interface CanVoteResult<TData = unknown> extends BaseQueryResultData<TData> {
  canVote: boolean;
}

export interface UseCanVoteOptions extends QueryOptions<boolean, unknown> {}

export type FetchDaoOptions = UseQueryOptions<DaoDetails | null, unknown, DaoDetails | null>;

export interface FetchDaoResult extends BaseQueryResultData<DaoDetails | null> {
  dao: DaoDetails | null;
}

export type FetchDaosOptions = UseQueryOptions<DaoListItem[], unknown, DaoListItem[], QueryKey>;

export interface FetchDaosResult extends Omit<UseQueryResult<DaoListItem[], unknown>, "data"> {
  daos: DaoListItem[];
}

export type FetchDaoBalancesOptions = UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>;

export type FetchDaoBalancesResult = UseQueryResult<AssetBalance[] | null, unknown> & {
  daoBalances: AssetBalance[] | null;
};

export type FetchTransferOptions = UseQueryOptions<Transfer[] | null, unknown, Transfer[] | null, QueryKey>;

export type FetchTransfersResult = UseQueryResult<Transfer[] | null, unknown> & {
  transfers: Transfer[] | null;
};

export interface FetchMembersResult extends Omit<UseQueryResult<string[]>, "data"> {
  members: string[];
}

export type FetchMembersOptions = QueryOptions<string[], unknown>;

export type EstimateDepositEthOptions = UseQueryOptions<
  GasFeeEstimation | null,
  unknown,
  GasFeeEstimation | null,
  QueryKey
>;

export type EstimateDepositEthResult = UseQueryResult<GasFeeEstimation | null, unknown> & {
  estimatedGas: GasFeeEstimation | null;
};

export type DepositEthResult = UseMutationResult<unknown, unknown, DepositEthParams, unknown> & {
  depositEth: UseMutateFunction<unknown, unknown, DepositEthParams, unknown> | null;
};

export type DepositEthOptions = UseMutationOptions<DaoDepositStepValue, unknown, DepositEthParams, unknown>;
