export interface IAssetData {
  id: number;
  amount: bigint | string;
  creator: string;
  frozen: boolean;
  decimals: string;
  name?: string;
  unitName?: string;
  url?: string;
}

export interface ChainType {
  type: AlgoChain;
}

type AlgoChain = "mainnet" | "testnet";
