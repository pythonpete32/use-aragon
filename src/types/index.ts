import {
  DaoListItem,
  DaoDetails,
  AssetBalance,
  Transfer,
  GasFeeEstimation,
  TokenVotingProposal,
  TokenVotingProposalListItem,
  VotingSettings,
  MultisigVotingSettings,
} from "@aragon/sdk-client";
import { DaoDepositStepValue, DepositEthParams, TokenType } from "@aragon/sdk-client/dist/interfaces";
import { Erc20TokenDetails, TokenBaseDetails } from "@aragon/sdk-client/dist/tokenVoting/interfaces";
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

export type { Address } from "wagmi";

export type FetchDaoOptions = UseQueryOptions<DaoDetails | null, unknown, DaoDetails | null>;

export interface FetchDaosResult extends Omit<UseQueryResult<DaoListItem[], unknown>, "data"> {
  daos: DaoListItem[];
}
export type FetchDaoBalancesResult = UseQueryResult<AssetBalance[] | null, unknown> & {
  daoBalances: AssetBalance[] | null;
};
export type FetchTransfersResult = UseQueryResult<Transfer[] | null, unknown> & {
  transfers: Transfer[] | null;
};

export type EstimateDepositEthResult = UseQueryResult<GasFeeEstimation | null, unknown> & {
  estimatedGas: GasFeeEstimation | null;
};
export type DepositEthResult = UseMutationResult<unknown, unknown, DepositEthParams, unknown> & {
  depositEth: UseMutateFunction<unknown, unknown, DepositEthParams, unknown> | null;
};
//
export interface CanVoteResult<TData = unknown> extends BaseQueryResultData<TData> {
  canVote: boolean;
}
export interface FetchProposalsResult extends BaseQueryResultData<TokenVotingProposalListItem[]> {
  proposals: TokenVotingProposalListItem[];
}
export type UseFetchVoteSettingsResult = BaseQueryResultData<VotingSettings | null> & {
  voteSettings: VotingSettings | null;
};
export interface FetchDaoResult extends BaseQueryResultData<DaoDetails | null> {
  dao: DaoDetails | null;
}
//

export type FetchProposalResult = Omit<UseQueryResult<TokenVotingProposal | null>, "data"> & {
  proposal: TokenVotingProposal | null;
};
export interface FetchMembersResult extends Omit<UseQueryResult<string[]>, "data"> {
  members: string[];
}

export type FetchVoteSettingsOptions = UseQueryOptions<VotingSettings | null, unknown>;
export type FetchProposalsOptions = UseQueryOptions<TokenVotingProposalListItem[]>;
export type FetchDaosOptions = UseQueryOptions<DaoListItem[], unknown, DaoListItem[], QueryKey>;
export type FetchDaoBalancesOptions = UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>;
export type DepositEthOptions = UseMutationOptions<DaoDepositStepValue, unknown, DepositEthParams, unknown>;
export type FetchTransferOptions = UseQueryOptions<Transfer[] | null, unknown, Transfer[] | null, QueryKey>;
export type FetchMembersOptions = QueryOptions<string[], unknown>;
export type FetchProposalsOption = UseQueryOptions<TokenVotingProposal | null, unknown>;
export type EstimateDepositEthOptions = UseQueryOptions<
  GasFeeEstimation | null,
  unknown,
  GasFeeEstimation | null,
  QueryKey
>;
export interface UseCanVoteOptions extends QueryOptions<boolean, unknown> {}

export type Erc721TokenDetails = TokenBaseDetails & {
  type: TokenType.ERC721;
};

export type TokenDetails = Erc20TokenDetails | Erc721TokenDetails;
export type FetchTokenOptions = UseQueryOptions<TokenDetails | null, unknown>;
export type UseFetchTokenResult = BaseQueryResultData<TokenDetails | null> & {
  token: TokenDetails | null;
};

export interface UseCanApproveOptions extends QueryOptions<boolean, unknown> {}

export interface CanApproveResult extends BaseQueryResultData<boolean> {
  canApprove: boolean;
}

export interface UseCanExecuteOptions extends QueryOptions<boolean, unknown> {}

export interface CanExecuteParams {
  pluginAddress: string;
}

export interface CanExecuteResult extends BaseQueryResultData<boolean> {
  canExecute: boolean;
}

export interface FetchMultisigSettingsOptions extends QueryOptions<MultisigVotingSettings, unknown> {}

export interface FetchMultisigSettingsResult extends BaseQueryResultData<MultisigVotingSettings | null> {
  multisigSettings: MultisigVotingSettings | null;
}
