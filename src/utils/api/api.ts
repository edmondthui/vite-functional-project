import { assertNever } from "@kofno/piper";
import algosdk from "algosdk";
import { ChainType, IAssetData } from "./Types";

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
  address: string
): Promise<IAssetData[]> => {
  const client = createClient(chainType);

  const accountInfo = await client
    .accountInformation(address)
    .setIntDecoding(algosdk.IntDecoding.BIGINT)
    .do();

  const algoBalance = accountInfo.amount.toString();
  const assetsFromRes: Array<{
    "asset-id": bigint;
    amount: bigint;
    "is-frozen": boolean;
  }> = accountInfo.assets;

  const assets: IAssetData[] = assetsFromRes.map(
    ({ "asset-id": id, amount, "is-frozen": frozen }) => ({
      id: Number(id),
      amount: amount.toString(),
      frozen,
      decimals: 0,
      creator: "",
    })
  );

  assets.sort((a, b) => a.id - b.id);

  await Promise.all(
    assets.map((asset, i) => {
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            const { params } = await client.getAssetByID(asset.id).do();
            asset.name = params.name;
            asset.unitName = params["unit-name"];
            asset.url = params.url;
            asset.decimals = params.decimals;
            asset.creator = params.creator;
          } catch {
            console.error("asset:", asset.id);
          }
          resolve();
        }, 25 * i);
      });
    })
  );

  assets.unshift({
    id: 0,
    amount: algoBalance,
    creator: "",
    frozen: false,
    decimals: 6,
    name: "Algo",
    unitName: "Algo",
  });

  return assets;
};
