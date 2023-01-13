export type State = Ready | Error | Loading | OpenModal;

interface Ready {
  kind: "ready";
}

interface Error {
  kind: "error";
}

interface Loading {
  kind: "loading";
}

interface OpenModal {
  kind: "open-modal";
}

export const ready = (): Ready => ({
  kind: "ready",
});

export const openModal = (): OpenModal => ({
  kind: "open-modal",
});

export const error = (): Error => ({
  kind: "error",
});

export const loading = (): Loading => ({
  kind: "loading",
});
