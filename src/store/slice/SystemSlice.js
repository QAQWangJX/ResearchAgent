import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    isLoading: false,
    loadingCount: 0,
    systemName: "",
    themeColor: "#1677ff",
    breadcrumbItems: [
      {
        title: "Home",
      },
    ],
  },
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1;
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.loadingCount -= 1;
      if (state.loadingCount <= 0) {
        state.isLoading = false;
        state.loadingCount = 0;
      }
    },
    setSystemName: (state, action) => {
      state.systemName = action.payload;
    },
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    setBreadcrumbItems: (state, action) => {
      state.breadcrumbItems = action.payload;
    },
  },
});

export const { startLoading, endLoading, setSystemName, setThemeColor } =
  systemSlice.actions;

export default systemSlice.reducer;
