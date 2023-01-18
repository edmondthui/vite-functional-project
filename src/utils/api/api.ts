import Task from "taskarian";
import { assertNever } from "@kofno/piper";
import algosdk from "algosdk";
import { AssetArray, ChainType, IAssetData } from "./Types";

const createClient = (chain: ChainType): algosdk.Algodv2 => {
  switch (chain.type) {
    case "mainnet":
      return new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", "");
    case "testnet":
      return new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "");
    default:
      assertNever(chain.type);
  }
};

export const getAccountAssets = async (
  chainType: ChainType,
  address: string,
  chainId: number
): Promise<IAssetData[]> => {
  const client = createClient(chainType);

  const accountInfo = Task.fromPromise(() =>
    client
      .accountInformation(address)
      .setIntDecoding(algosdk.IntDecoding.BIGINT)
      .do()
  );

  // const algoBalance = accountInfo.map((accountInfo) =>
  //   accountInfo.amount.toString()
  // );

  const assets = accountInfo
    .map<AssetArray>((accountInfo) => accountInfo.assets)
    .resolve()
    .then((assets) =>
      assets
        .map<IAssetData>(({ "asset-id": id, amount, "is-frozen": frozen }) => ({
          id: Number(id),
          amount: amount.toString(),
          frozen,
          decimals: 0,
          creator: "",
        }))
        .sort((a, b) => a.id - b.id)
    );
  // .then((assets) =>
  //   assets.map((asset, i) => {
  //     return new Promise<void>((resolve) => {
  //       setTimeout(async () => {
  //         try {
  //           const { params } = await client.getAssetByID(asset.id).do();
  //           asset.name = params.name;
  //           asset.unitName = params["unit-name"];
  //           asset.url = params.url;
  //           asset.decimals = params.decimals;
  //           asset.creator = params.creator;
  //         } catch (error) {
  //           console.error("asset:", asset.id);
  //         }
  //         resolve();
  //       }, 25 * i);
  //     });
  //   })
  // )

  return assets;
};
