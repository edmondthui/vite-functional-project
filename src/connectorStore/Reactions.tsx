import { assertNever } from "@kofno/piper";
import { observer } from "mobx-react";
import ReactionComponent, { RCProps } from "../utils/ReactionComponent";
import ConnectorStore from "./Store";
import { State } from "./Types";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

interface Props extends RCProps<ConnectorStore> {
  store: ConnectorStore;
}

const connectProps = {
  bridge: "https://bridge.walletconnect.org",
  qrCodeModal: QRCodeModal,
};

class ConnectorReactions extends ReactionComponent<
  ConnectorStore,
  State,
  Props
> {
  tester = () => this.props.store.state;
  effect = (state: State) => {
    const { store } = this.props;
    switch (state.kind) {
      case "loading":
        store.ready(new WalletConnect(connectProps));
        break;
      case "ready":
        console.log(state);
        break;
      case "error":
        break;
      default:
        assertNever(state);
    }
  };
}

export default observer(ConnectorReactions);
