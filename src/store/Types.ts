import { AlgoChain } from "../utils/api/Types";

export type State = Ready | Error | Loading | OpenModal;

interface Ready {
  kind: "ready";
  chain: AlgoChain;
}

interface Error {
  kind: "error";
}

interface Loading {
  kind: "loading";
  chain: AlgoChain;
}

interface OpenModal {
  kind: "open-modal";
  chain: AlgoChain;
}

export const ready = (state: OpenModal | Loading): Ready => ({
  ...state,
  kind: "ready",
});

export const openModal = (state: Ready): OpenModal => ({
  ...state,
  kind: "open-modal",
});

export const error = (): Error => ({
  kind: "error",
});

export const loading = (): Loading => ({
  kind: "loading",
  chain: "testnet",
});

export const setChain = (chain: AlgoChain): Ready => ({
  kind: "ready",
  chain,
});
