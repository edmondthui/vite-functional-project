import WalletConnect from "@walletconnect/client";
import { Button } from "evergreen-ui";
import { observer } from "mobx-react";
import ConnectorStore from "../../connectorStore/Store";
import Store from "../../store/Store";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const disconnect = (
  connector: WalletConnect,
  connectorStore: ConnectorStore
) => {
  connector.killSession();
  connectorStore.ready(connector);
};

const Wallet: React.FC<Props> = ({ connectorStore, store }) =>
  connectorStore.account
    .map((account) => (
      <div className="ml-auto flex">
        {connectorStore.connector
          .map((connector) => (
            <>
              <div className="align-middle p-2">{account}</div>
              <Button onClick={() => disconnect(connector, connectorStore)}>
                Disconnect
              </Button>
            </>
          ))
          .getOrElse(() => (
            <></>
          ))}
      </div>
    ))
    .getOrElse(() => (
      <Button marginLeft={"auto"} onClick={store.openModal}>
        Connect Wallet
      </Button>
    ));

export default observer(Wallet);
