import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import { goerli } from "wagmi/chains";

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "My wagmi + ConnectKit App",
    alchemyId: import.meta.env.VITE_ALCHEMY_API_KEY!,
    chains: [goerli],
  }),
);
