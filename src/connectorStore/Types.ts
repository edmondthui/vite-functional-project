import WalletConnect from "@walletconnect/client";

export type State = Ready | Error | Loading | Connecting | Connected;

interface Ready {
  kind: "ready";
  connector: WalletConnect;
}

interface Error {
  kind: "error";
}

interface Loading {
  kind: "loading";
}

interface Connecting {
  kind: "connecting";
  connector: WalletConnect;
}

interface Connected {
  kind: "connected";
  connector: WalletConnect;
  accounts: string[];
  chainId: number;
  peerId: string;
}

export const ready = (connector: WalletConnect): Ready => ({
  kind: "ready",
  connector,
});

export const error = (): Error => ({
  kind: "error",
});

export const loading = (): Loading => ({
  kind: "loading",
});

export const connecting = (state: Ready | Connecting): Connecting => ({
  ...state,
  kind: "connecting",
});

export const connected = (connector: WalletConnect): Connected => ({
  kind: "connected",
  connector,
  accounts: connector.accounts,
  chainId: connector.chainId,
  peerId: connector.peerId,
});
