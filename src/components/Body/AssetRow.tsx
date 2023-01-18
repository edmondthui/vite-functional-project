import { observer } from "mobx-react";
import React from "react";
import { IAssetData } from "../../utils/api/Types";

interface Props {
  assets: IAssetData[];
}

const addDecimals = (number: string, decimals: number): number =>
  Number(number.slice(0, -decimals) + "." + number.slice(-decimals));

const AccountAssets: React.FC<Props> = ({ assets }) => (
  <>
    {assets.map((asset) => (
      <div>{addDecimals(String(asset.amount), asset.decimals)}</div>
    ))}
  </>
);

export default observer(AccountAssets);
