import { Button } from "evergreen-ui";
import { observer } from "mobx-react";
import ConnectorStore from "../../connectorStore/Store";
import Store from "../../store/Store";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const Wallet: React.FC<Props> = ({ connectorStore, store }) =>
  connectorStore.account
    .map((account) => {
      console.log(account);
      return <div>{account}</div>;
    })
    .getOrElse(() => (
      <Button marginLeft={"auto"} onClick={store.openModal}>
        Connect Wallet
      </Button>
    ));

export default observer(Wallet);
