import { DaoListItem, DaoDetails, AssetBalance, Transfer } from "@aragon/sdk-client";
import { UseQueryResult } from "react-query";

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
