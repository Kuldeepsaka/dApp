import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  address: string | null;
  ensName: string | null;
  balance: string | null;
  symbol: string | null;
  chainId: number | null;
  chainName: string | null;
}

const initialState: WalletState = {
  address: null,
  ensName: null,
  balance: null,
  symbol: null,
  chainId: null,
  chainName: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletInfo(state, action: PayloadAction<WalletState>) {
      return { ...state, ...action.payload };
    },
    clearWalletInfo() {
      return initialState;
    },
  },
});

export const { setWalletInfo, clearWalletInfo } = walletSlice.actions;
export default walletSlice.reducer;
