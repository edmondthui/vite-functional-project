import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import React from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ConnectorReactions from "./store/connectorStore/Reactions";
import Reactions from "./store/Reactions";
import Store from "./store/Store";

interface Props {}

class App extends React.Component<Props> {
  store = new Store();

  render() {
    return (
      <>
        <Pane
          height={"100vh"}
          width={"100vw"}
          top={0}
          right={0}
          bottom={0}
          left={0}
          position={"absolute"}
          justifyContent={"center"}
          backgroundColor="DarkSeaGreen"
        >
          <Header
            connectorStore={this.store.connectorStore}
            store={this.store}
          />
          <Body connectorStore={this.store.connectorStore} store={this.store} />
          <Modal
            store={this.store}
            connectorStore={this.store.connectorStore}
          />
          <Reactions store={this.store} fireImmediately={true} />
          <ConnectorReactions
            store={this.store.connectorStore}
            fireImmediately={true}
          />
        </Pane>
      </>
    );
  }
}

export default observer(App);
