import { assertNever } from "@kofno/piper";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { observer } from "mobx-react";
import ReactionComponent, { RCProps } from "../utils/ReactionComponent";
import ConnectorStore from "./Store";
import { State } from "./Types";

interface Props extends RCProps<ConnectorStore> {
  store: ConnectorStore;
}

export const connectProps = {
  bridge: "https://bridge.walletconnect.org",
  qrCodeModal: QRCodeModal,
};

const connect = async (connector: WalletConnect) => {
  await connector.createSession();
  QRCodeModal.open(connector.uri, null);
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
        const walletConnect = new WalletConnect(connectProps);
        console.log(walletConnect);
        walletConnect.connected
          ? store.connected(walletConnect)
          : store.ready(walletConnect);
        break;
      case "ready":
        break;
      case "connecting":
        state.connector.on("connect", (error, payload) => {
          QRCodeModal.close();
          store.connected(state.connector);
        });
        state.connector.on("disconnect", (error, payload) => {
          store.ready(state.connector);
        });
        state.connector.on("session_update", (error, payload) => {
          store.connected(state.connector);
        });
        connect(state.connector);
        break;
      case "connected":
        break;
      case "error":
        break;
      default:
        assertNever(state);
    }
  };
}

export default observer(ConnectorReactions);
