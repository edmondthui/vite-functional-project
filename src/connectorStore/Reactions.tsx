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

const connectProps = {
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
        store.ready(new WalletConnect(connectProps));
        break;
      case "ready":
        break;
      case "connecting":
        state.connector.on("connect", (error, payload) => {
          console.log("on connect");
          QRCodeModal.close();
          console.log(payload);
          const { account } = payload.params[0];
          store.connected(account);
        });
        state.connector.on("disconnect", (error, payload) => {
          console.log("on disconnect");
          store.ready(state.connector);
        });
        state.connector.on("session_update", (error, payload) => {
          store.connected(payload.params[0]);
        });
        connect(state.connector);
        break;
      case "connected":
        console.log(state.account);
        console.log("connected");
        break;
      case "error":
        break;
      default:
        assertNever(state);
    }
  };
}

export default observer(ConnectorReactions);
