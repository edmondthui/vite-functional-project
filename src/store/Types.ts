import { just, Maybe, nothing } from "maybeasy";

export type State = Ready | Error | Loading;

interface Ready {
  kind: "ready";
}

interface Error {
  kind: "error";
}

interface Loading {
  kind: "loading";
}

export const ready = (): Ready => ({
  kind: "ready",
});

export const error = (): Error => ({
  kind: "error",
});

export const loading = (): Loading => ({
  kind: "loading",
});
