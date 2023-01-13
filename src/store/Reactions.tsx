import { assertNever } from "@kofno/piper";
import ReactionComponent, { RCProps } from "./ReactionComponent";
import { observer } from "mobx-react";
import Store from "./Store";
import { State } from "./Types";

interface Props extends RCProps<Store> {
  store: Store;
}

class Reactions extends ReactionComponent<Store, State, Props> {
  tester = () => this.props.store.state;
  effect = (state: State) => {
    const { store } = this.props;
    switch (state.kind) {
      case "loading":
        store.ready();
        break;
      case "ready":
        console.log(state);
        console.log("ready");
        break;
      case "error":
      case "open-modal":
        break;
      default:
        assertNever(state);
    }
  };
}

export default observer(Reactions);
