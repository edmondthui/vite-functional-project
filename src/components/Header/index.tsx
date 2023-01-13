import { Pane, Select, Text } from "evergreen-ui";
import { observer } from "mobx-react";
import Store from "../../store/Store";
import Wallet from "./Wallet";

interface Props {
  store: Store;
}

const Header: React.FC<Props> = ({ store }) => (
  <Pane
    display="flex"
    width="65%"
    padding={16}
    background="AliceBlue"
    borderRadius={3}
    marginX="auto"
    marginTop={"2%"}
  >
    <Text alignSelf="center">Connected to: </Text>
    <div>
      <Select width="100%" paddingLeft={16}></Select>
    </div>
    <Wallet store={store} />
  </Pane>
);

export default observer(Header);
