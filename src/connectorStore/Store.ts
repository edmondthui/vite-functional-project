import { assertNever } from "@kofno/piper";
import WalletConnect from "@walletconnect/client";
import { just, Maybe, nothing } from "maybeasy";
import { action, computed, observable } from "mobx";
import { connectProps } from "./Reactions";
import { connected, connecting, error, loading, ready, State } from "./Types";

class ConnectorStore {
  @observable
  state: State = loading();

  @action
  ready = (connector: WalletConnect) => {
    switch (this.state.kind) {
      case "loading":
      case "connected":
        this.state = ready(connector);
        break;
      case "ready":
      case "error":
      case "connecting":
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
      case "connected":
        this.state = error();
        break;
      case "error":
      case "connecting":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  connect = () => {
    switch (this.state.kind) {
      case "connecting":
        this.state.connector = new WalletConnect(connectProps);
        this.state = connecting(this.state);
        break;
      case "ready":
        this.state = connecting(this.state);
        break;
      case "loading":
      case "error":
      case "connected":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  connected = (account: any) => {
    switch (this.state.kind) {
      case "connecting":
      case "connected":
        this.state = connected(this.state, account);
        break;
      case "ready":
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
      case "connected":
      case "connecting":
        return just(this.state.connector);
      case "loading":
      case "error":
        return nothing();
      default:
        assertNever(this.state);
    }
  }

  @computed
  get account(): Maybe<any> {
    switch (this.state.kind) {
      case "connected":
        return just(this.state.account);
      case "ready":
      case "connecting":
      case "loading":
      case "error":
        return nothing();
      default:
        assertNever(this.state);
    }
  }
}

export default ConnectorStore;
