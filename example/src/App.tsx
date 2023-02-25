import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Account } from "./components";

import { useFetchDaos } from "../../src";

export function App(): JSX.Element {
  const { isConnected } = useAccount();
  useFetchDaos(
    {},
    {
      onError(err) {
        console.log({ "❌ useFetchDaos()": err });
      },
      onSuccess(data) {
        console.log({ "✅ useFetchDaos()": data });
      },
    },
  );
  return (
    <>
      <h1>wagmi + ConnectKit + Vite</h1>
      <ConnectKitButton />
      {isConnected && <Account />}
    </>
  );
}
