import React from "react";
import Store from "../../store/Store";
import ConnectorStore from "../../connectorStore/Store";
import { observer } from "mobx-react";

interface Props {
  connectorStore: ConnectorStore;
  store: Store;
}

const AccountAssets: React.FC<Props> = ({ connectorStore, store }) => (
  <div className="loading-icon">
    <span></span>
  </div>
);

export default observer(AccountAssets);
