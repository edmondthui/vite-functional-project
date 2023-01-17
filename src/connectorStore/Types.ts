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
  account: any;
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

export const connected = (
  state: Connecting | Connected,
  account: any
): Connected => ({
  ...state,
  kind: "connected",
  account: account,
});
