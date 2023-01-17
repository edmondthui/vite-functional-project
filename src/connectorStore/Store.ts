import { assertNever } from "@kofno/piper";
import WalletConnect from "@walletconnect/client";
import { just, Maybe, nothing } from "maybeasy";
import { action, computed, observable } from "mobx";
import { error, loading, ready, State } from "./Types";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

class ConnectorStore {
  @observable
  state: State = loading();

  @action
  ready = (connector: WalletConnect) => {
    switch (this.state.kind) {
      case "loading":
        this.state = ready(connector);
        break;
      case "ready":
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  error = () => {
    switch (this.state.kind) {
      case "ready":
      case "loading":
        this.state = error();
        break;
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  connect = () => {
    switch (this.state.kind) {
      case "ready":
        QRCodeModal.open(this.state.connector.uri, null);
        break;
      case "loading":
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };

  @computed
  get connector(): Maybe<WalletConnect> {
    switch (this.state.kind) {
      case "ready":
        return just(this.state.connector);
      case "loading":
      case "error":
        return nothing();
      default:
        assertNever(this.state);
    }
  }
}

export default ConnectorStore;
