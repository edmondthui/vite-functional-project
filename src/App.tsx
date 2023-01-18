import { Button, Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import React from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Reactions from "./store/Reactions";
import Store from "./store/Store";
import ConnectorReactions from "./connectorStore/Reactions";
import ConnectorStore from "./connectorStore/Store";

interface Props {}

class App extends React.Component<Props> {
  store = new Store();
  connectorStore = new ConnectorStore();

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
          <Header connectorStore={this.connectorStore} store={this.store} />
          <Body connectorStore={this.connectorStore} store={this.store} />
          <Modal store={this.store} connectorStore={this.connectorStore} />
          <Reactions store={this.store} fireImmediately={true} />
          <ConnectorReactions
            store={this.connectorStore}
            fireImmediately={true}
          />
        </Pane>
      </>
    );
  }
}

export default observer(App);
