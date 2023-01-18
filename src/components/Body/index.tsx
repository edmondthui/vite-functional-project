import { noop } from "@kofno/piper";
import { Pane } from "evergreen-ui";
import { just } from "maybeasy";
import { observer } from "mobx-react";
import React from "react";
import Task from "taskarian";
import ConnectorStore from "../../store/connectorStore/Store";
import Store from "../../store/Store";
import { getAccountAssets } from "../../utils/api/api";
import { ChainType } from "../../utils/api/Types";
import AccountAssets from "./AccountAssets";
import LoadingIcon from "./LoadingIcon";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}
const getAssetData = (
  chainType: ChainType,
  account: string,
  connectorStore: ConnectorStore
) =>
  getAssetsTask(chainType, account).fork(noop, (assets) =>
    connectorStore.connectedWithAssets(assets)
  );

const getAssetsTask = (chainType: ChainType, account: string) =>
  Task.fromPromise(() => getAccountAssets(chainType, account));

const Body: React.FC<Props> = ({ connectorStore, store }) => {
  switch (connectorStore.state.kind) {
    case "connected":
      just({})
        .assign("chainType", store.chainType)
        .assign("account", connectorStore.account)
        .map(({ chainType, account }) =>
          getAssetData(chainType, account, connectorStore)
        );
      return (
        <Pane
          marginTop="2%"
          background="AliceBlue"
          height={500}
          width="65%"
          borderRadius={3}
          marginX="auto"
          justifyContent="center"
          display="flex"
        >
          <LoadingIcon />
        </Pane>
      );
    case "connected-with-assets":
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
      return <></>;
  }
};

export default observer(Body);
