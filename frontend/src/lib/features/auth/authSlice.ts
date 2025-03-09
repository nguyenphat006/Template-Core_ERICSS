import { createAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "@/lib/store";

export const revertAll = createAction("REVERT_ALL");

const initialState = {
  token: "",
  user: null,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.userId = action.payload.id;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.token = "";                             
      state.user = null;
      state.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
  },              
});

export const { setCredentials, logOut } = authSlice.actions;                            

export const logOutAndRevertAll = () => (dispatch: AppDispatch) => {
  dispatch(logOut());
  dispatch(revertAll());
};

export default authSlice.reducer;
