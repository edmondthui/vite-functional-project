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

// export async function getAccountAssets = (chainType: ChainType, address: string, chainId: number): Promise<IAssetData[]> => {
//   const clinet =  createClient(chainType);
//   return ""
// }
