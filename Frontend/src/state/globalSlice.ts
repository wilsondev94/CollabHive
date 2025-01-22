import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateType {
  sidebarCollapse: boolean;
  darkMode: boolean;
}

const initialState: InitialStateType = {
  sidebarCollapse: false,
  darkMode: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSidebarCollapse: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapse = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setSidebarCollapse, setDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
