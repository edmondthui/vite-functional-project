import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import ConnectorStore from "../../connectorStore/Store";
import Store from "../../store/Store";
import AccountAssets from "./AccountAssets";
import LoadingIcon from "./LoadingIcon";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const Body: React.FC<Props> = ({ connectorStore, store }) => {
  switch (connectorStore.state.kind) {
    case "connected":
      return (
        <Pane
          marginTop="2%"
          background="AliceBlue"
          height={500}
          width="65%"
          borderRadius={3}
          marginX="auto"
        >
          <AccountAssets connectorStore={connectorStore} store={store} />
        </Pane>
      );
    case "connecting":
    case "error":
    case "loading":
    case "ready":
      return <LoadingIcon />;
  }
};

export default observer(Body);
