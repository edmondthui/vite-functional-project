import { fromBool } from "@execonline-inc/maybe-adapter";
import { Button, Dialog } from "evergreen-ui";
import { observer } from "mobx-react";
import ConnectorStore from "../../connectorStore/Store";
import Store from "../../store/Store";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

interface Props {
  store: Store;
  connectorStore: ConnectorStore;
}

const Modal: React.FC<Props> = ({ store, connectorStore }) => {
  switch (store.state.kind) {
    case "open-modal":
      return (
        <Dialog
          isShown={true}
          hasFooter={false}
          title="Connect to your wallet"
          onCloseComplete={() => store.ready()}
        >
          <Button
            onClick={() => {
              connectorStore.connect();
            }}
          >
            <span>Algorand Wallet</span>
          </Button>
        </Dialog>
      );
    case "error":
    case "loading":
    case "ready":
      return <></>;
  }
};

export default observer(Modal);
