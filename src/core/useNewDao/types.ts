import { DaoMetadata, IPluginInstallItem } from '@aragon/sdk-client';

export enum NewDaoStatus {
  IDLE = 'idle',
  PINNING_METADATA = 'pinningMetadata',
  CREATING_DAO = 'creatingDao',
  CONFIRMING_TRANSACTION = 'confirmingTransaction',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface NewDaoState {
  daoAddress: string | null;
  daoTxHash: string | null;
  creationStatus: NewDaoStatus;
}

export type NewDaoParams = {
  daoMetadata: DaoMetadata;
  daoUri?: string;
  ensSubdomain: string;
  trustedForwarder?: string;
  plugins: IPluginInstallItem[];
};
