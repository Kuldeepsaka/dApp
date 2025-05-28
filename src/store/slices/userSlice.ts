import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  address: string | null;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  address: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.address = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.address = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
