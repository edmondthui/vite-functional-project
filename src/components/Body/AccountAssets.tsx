import { observer } from "mobx-react";
import React from "react";
import ConnectorStore from "../../connectorStore/Store";
import Store from "../../store/Store";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const AccountAssets: React.FC<Props> = ({ connectorStore, store }) => (
  <div>
    <>
      <h2 className={"pt-6 text-xl font-bold"}>Account Balance</h2>
      {connectorStore.assets
        .map((assets) => <>assets</>)
        .getOrElse(() => (
          <></>
        ))}
    </>
  </div>
);

export default observer(AccountAssets);
