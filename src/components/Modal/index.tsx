import { Dialog, Button } from "evergreen-ui";
import { observer } from "mobx-react";
import Store from "../../store/Store";

interface Props {
  store: Store;
}

const Modal: React.FC<Props> = ({ store }) => {
  switch (store.state.kind) {
    case "open-modal":
      return (
        <Dialog
          isShown={true}
          hasFooter={false}
          onCloseComplete={() => store.ready()}
        >
          <Button onClick={() => console.log("test")}>
            <span>Wallet</span>
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
