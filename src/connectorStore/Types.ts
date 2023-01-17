import WalletConnect from "@walletconnect/client";

export type State = Ready | Error | Loading;

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
