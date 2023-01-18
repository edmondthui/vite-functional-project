import { assertNever } from "@kofno/piper";
import WalletConnect from "@walletconnect/client";
import { just, Maybe, nothing } from "maybeasy";
import { action, computed, observable } from "mobx";
import { ChainType, IAssetData } from "../../utils/api/Types";
import { connectProps } from "./Reactions";
import {
  connected,
  connectedWithAssets,
  connecting,
  error,
  loading,
  ready,
  State,
} from "./Types";

class ConnectorStore {
  @observable
  state: State = loading();

  @action
  ready = (connector: WalletConnect) => {
    switch (this.state.kind) {
      case "loading":
      case "connected":
      case "connected-with-assets":
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
      case "connected-with-assets":
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
      case "connected-with-assets":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  connected = (connector: WalletConnect) => {
    switch (this.state.kind) {
      case "connecting":
      case "connected":
      case "loading":
      case "connected-with-assets":
        this.state = connected(connector);
        break;
      case "ready":
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  connectedWithAssets = (assets: IAssetData[]) => {
    switch (this.state.kind) {
      case "connected":
        this.state = connectedWithAssets(this.state, assets);
        console.log(this.state);
        break;
      case "connected-with-assets":
      case "connecting":
      case "loading":
      case "ready":
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
      case "connected-with-assets":
        return just(this.state.connector);
      case "loading":
      case "error":
        return nothing();
      default:
        assertNever(this.state);
    }
  }

  @computed
  get account(): Maybe<string> {
    switch (this.state.kind) {
      case "connected":
      case "connected-with-assets":
        return just(this.state.accounts[0]);
      case "ready":
      case "connecting":
      case "loading":
      case "error":
        return nothing();
      default:
        assertNever(this.state);
    }
  }

  @computed
  get assets(): Maybe<IAssetData[]> {
    switch (this.state.kind) {
      case "connected-with-assets":
        return just(this.state.assets);
      case "connected":
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
