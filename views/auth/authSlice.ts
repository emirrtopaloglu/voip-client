import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user_id: number;
  full_name: string;
  email: string;
  company_name?: string;
  address?: string;
  last_login?: string;
}

const initialState = {
  user_id: -1,
  full_name: "",
  email: "",
  company_name: "",
  address: "",
  last_login: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.user_id = action.payload.user_id;
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.company_name = action.payload.company_name;
      state.address = action.payload.address;
      state.last_login = action.payload.last_login;
    }
  }
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
