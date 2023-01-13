import { Button } from "evergreen-ui";
import { observer } from "mobx-react";
import Store from "../../store/Store";

interface Props {
  store: Store;
}

const Wallet: React.FC<Props> = ({ store }) => (
  <Button marginLeft={"auto"} onClick={store.openModal}>
    Connect Wallet
  </Button>
);

export default observer(Wallet);
