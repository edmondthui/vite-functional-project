import { Button, Dialog } from "evergreen-ui";
import { observer } from "mobx-react";
import ConnectorStore from "../../store/connectorStore/Store";
import Store from "../../store/Store";
import algowallet from "../../assets/algorandwallet.svg";

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
            className="w-full"
            onClick={() => {
              connectorStore.connect();
              store.ready();
            }}
          >
            <img
              src={algowallet}
              className="flex-initial items-start align-middle h-full px-1"
            />
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
