import { assertNever } from "@kofno/piper";
import { just, Maybe, nothing } from "maybeasy";
import { action, computed, observable } from "mobx";
import { AlgoChain, ChainType } from "../utils/api/Types";
import { error, loading, openModal, ready, setChain, State } from "./Types";

class Store {
  @observable
  state: State = loading();

  @action
  ready = () => {
    switch (this.state.kind) {
      case "loading":
      case "open-modal":
        this.state = ready(this.state);
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
      case "open-modal":
        this.state = error();
        break;
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  openModal = () => {
    switch (this.state.kind) {
      case "ready":
        console.log("open modal");
        this.state = openModal(this.state);
        break;
      case "loading":
      case "error":
      case "open-modal":
        break;
      default:
        assertNever(this.state);
    }
  };

  @action
  setChain = (chain: AlgoChain) => {
    switch (this.state.kind) {
      case "ready":
        console.log(chain);
        this.state = setChain(chain);
        console.log(this.state);
        break;
      case "loading":
      case "error":
      case "open-modal":
        break;
      default:
        assertNever(this.state);
    }
  };

  @computed
  get chainType(): Maybe<ChainType> {
    switch (this.state.kind) {
      case "ready":
        console.log(this.state.chain);
        return just({ type: this.state.chain });
      case "loading":
      case "error":
      case "open-modal":
        return nothing();
      default:
        assertNever(this.state);
    }
  }
}

export default Store;
