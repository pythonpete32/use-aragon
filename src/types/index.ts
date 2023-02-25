import { DaoListItem, DaoDetails, AssetBalance, Transfer, GasFeeEstimation } from "@aragon/sdk-client";
import { DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import { UseMutateFunction, UseMutationResult, UseQueryResult } from "react-query";

export interface FetchDaosResult extends Omit<UseQueryResult<DaoListItem[], unknown>, "data"> {
  daos: DaoListItem[];
}

export interface FetchDaoResult extends Omit<UseQueryResult<DaoDetails | null, unknown>, "data"> {
  dao: DaoDetails | null;
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

export type UseDepositEthResult = UseMutationResult<unknown, unknown, DepositEthParams, unknown> & {
  depositEth: UseMutateFunction<unknown, unknown, DepositEthParams, unknown> | null;
};
