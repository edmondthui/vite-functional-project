import { observer } from "mobx-react";
import React from "react";
import { IAssetData } from "../../utils/api/Types";
import algo from "../../assets/algo.svg";

interface Props {
  assets: IAssetData[];
}

const getImgSrc = (name: string): string => {
  switch (name) {
    case "Algo":
      return algo;
    default:
      return "";
  }
};

const addDecimals = (number: string, decimals: number): number =>
  Number(number.slice(0, -decimals) + "." + number.slice(-decimals));

const AccountAssets: React.FC<Props> = ({ assets }) => (
  <>
    {assets.map((asset, idx) => (
      <div key={idx} className="flex justify-center w-1/3 mx-auto mt-8">
        <div className={"mr-auto flex items-center"}>
          <img src={getImgSrc(String(asset.name))} className={"h-full px-1"} />{" "}
          {asset.name}
        </div>
        <div className={"ml-auto items-center"}>
          {addDecimals(String(asset.amount), asset.decimals)} Algo
        </div>
      </div>
    ))}
  </>
);

export default observer(AccountAssets);
