export interface IAssetData {
  id: number;
  amount: bigint | string;
  creator: string;
  frozen: boolean;
  decimals: number;
  name?: string;
  unitName?: string;
  url?: string;
}

export interface ChainType {
  type: AlgoChain;
}

export type AlgoChain = "mainnet" | "testnet";

export interface Asset {
  "asset-id": bigint;
  amount: bigint;
  "is-frozen": boolean;
}

export type AssetArray = Array<Asset>;

export interface StandardError {
  message: string;
}
