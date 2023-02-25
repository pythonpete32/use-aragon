import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Account } from "./components";

import {
  useDepositEth,
  useEstimateDepositEth,
  useFetchDao,
  useFetchDaoBalances,
  useFetchDaos,
  useFetchTransfers,
} from "../../src";
import { DepositParams, TokenType } from "@aragon/sdk-client";
import { DepositEthParams } from "@aragon/sdk-client/dist/interfaces";

const daoAddress = "0xa65a1e3181eb4c568121e323f888cb702f3944ba";
const depositParams: DepositEthParams = {
  type: TokenType.NATIVE,
  daoAddressOrEns: daoAddress,
  amount: BigInt(10), // amount in wei
};

export function App(): JSX.Element {
  const { isConnected } = useAccount();
  useFetchDaos();
  useFetchDao(daoAddress);
  useFetchTransfers({ daoAddressOrEns: daoAddress });
  useFetchDaoBalances({ daoAddressOrEns: daoAddress });
  useEstimateDepositEth(depositParams);
  const { depositEth, isIdle, isLoading, isError } = useDepositEth(depositParams, {
    onSuccess(data) {
      console.log({ success: data });
    },
  });

  const handleDepositEth = async () => {
    if (!depositEth) return;
    depositEth(depositParams);
  };

  return (
    <>
      <h1>wagmi + ConnectKit + Vite</h1>
      <ConnectKitButton />
      {isConnected && <Account />}
      {isLoading && <p>loading...</p>}
      {isError && <p>error</p>}
      {isIdle && <p>idle</p>}
      <button onClick={() => handleDepositEth()}>Deposit ETH</button>
    </>
  );
}
