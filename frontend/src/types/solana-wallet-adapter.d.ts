declare module '@solana/wallet-adapter-vue' {
  import { WalletName, Wallet } from '@solana/wallet-adapter-base';
  import { Ref, ComputedRef } from 'vue';
  import { PublicKey } from '@solana/web3.js';

  export interface WalletStore {
    wallets: Ref<Wallet[]>;
    wallet: ComputedRef<Wallet | null>;
    publicKey: ComputedRef<PublicKey | null>;
    connected: Ref<boolean>;
    connecting: Ref<boolean>;
    disconnecting: Ref<boolean>;
    select: (walletName: WalletName) => void;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    sendTransaction: any;
    signTransaction: Ref<any | null>;
    signAllTransactions: Ref<any | null>;
    signMessage: Ref<((message: Uint8Array) => Promise<Uint8Array>) | null>;
  }

  export function useWallet(): WalletStore;

  export interface InitWalletOptions {
    wallets: Wallet[];
    autoConnect?: boolean;
    onError?: (error: Error) => void;
    localStorageKey?: string;
  }

  export function initWallet(options: InitWalletOptions): void;
}
