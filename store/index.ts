import { configureStore } from "@reduxjs/toolkit";
import auth from "@/views/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth
  },
  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
