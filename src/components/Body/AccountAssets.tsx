import { observer } from "mobx-react";
import React from "react";
import ConnectorStore from "../../store/connectorStore/Store";
import Store from "../../store/Store";
import AssetRow from "./AssetRow";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const AccountAssets: React.FC<Props> = ({ connectorStore, store }) => (
  <div>
    <>
      <h2 className={"pt-6 text-xl font-bold"}>Account Balance</h2>
      {connectorStore.assets
        .map((assets) => <AssetRow assets={assets} />)
        .getOrElse(() => (
          <></>
        ))}
    </>
  </div>
);

export default observer(AccountAssets);
