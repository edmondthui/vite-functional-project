import { assertNever } from "@kofno/piper";
import { action, observable } from "mobx";
import { error, loading, openModal, ready, State } from "./Types";

class Store {
  @observable
  state: State = loading();

  @action
  ready = () => {
    switch (this.state.kind) {
      case "loading":
      case "open-modal":
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
        this.state = openModal();
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
}

export default Store;
