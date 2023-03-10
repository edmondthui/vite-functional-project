import { observer } from "mobx-react";
import React from "react";

const LoadingIcon: React.FC = () => {
  return (
    <div className="loading-icon">
      <span></span>
    </div>
  );
};

export default observer(LoadingIcon);
