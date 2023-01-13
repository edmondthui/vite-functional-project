import { Dialog, Button } from "evergreen-ui";
import "./App.css";
import Reactions from "./store/Reactions";
import Store from "./store/Store";

const App: React.FC = () => {
  const store = new Store();
  return (
    <div>
      <div>Test</div>
      {/* <Header/> */}
      {/* <Body/> */}
      {/* add this to reaction later */}
      <Dialog isShown={true} hasFooter={false}>
        <Button onClick={() => console.log("hi")}>
          <span>Wallet</span>
        </Button>
      </Dialog>
      <Reactions store={store} fireImmediately={true} />
    </div>
  );
};

export default App;
