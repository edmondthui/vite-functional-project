import { assertNever } from "@kofno/piper";
import { action, observable } from "mobx";
import { error, loading, ready, State } from "./Types";

class Store {
  @observable
  state: State = loading();

  @action
  ready = () => {
    switch (this.state.kind) {
      case "loading":
        this.state = ready();
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
      case "error":
        break;
      default:
        assertNever(this.state);
    }
  };
}

export default Store;
