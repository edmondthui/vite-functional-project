import { Dialog, Button, Pane } from "evergreen-ui";
import { observer } from "mobx-react";
import React from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Reactions from "./store/Reactions";
import Store from "./store/Store";

interface Props {}

class App extends React.Component<Props> {
  store = new Store();
  render() {
    return (
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
        <Header store={this.store} />
        <Body />
        {/* add this to reaction later */}
        <Modal store={this.store} />
        <Reactions store={this.store} fireImmediately={true} />
        {/* for debuggint state  */}
        <Button onClick={() => console.log(this.store.state)}>Test</Button>
      </Pane>
    );
  }
}

export default observer(App);
