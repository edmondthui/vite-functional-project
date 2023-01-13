import { Pane } from "evergreen-ui";
import { observer } from "mobx-react";

interface Props {}

const Body: React.FC<Props> = () => (
  <Pane
    marginTop="2%"
    background="AliceBlue"
    height={500}
    width="65%"
    borderRadius={3}
    marginX="auto"
  ></Pane>
);

export default observer(Body);
