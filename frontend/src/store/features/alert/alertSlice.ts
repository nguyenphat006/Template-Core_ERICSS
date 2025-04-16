import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: "alert",
    initialState: { open: false, btnColor: "", icon: "", title: "", message: "", onConfirm: null as (() => void) | null },
    reducers: {
        showAlert: (state, action) => {
            state.open = true;
            state.icon = action.payload.icon;
            state.title = action.payload.title
            state.btnColor = action.payload.btnColor;
            state.message = action.payload.message;
            state.onConfirm = action.payload.onConfirm;
        },
        closeAlert: (state) => {
            state.open = false;
            state.message = "";
            state.onConfirm = null;
        },
        confirmAction: (state) => {
            if (state.onConfirm) state.onConfirm();
            state.open = false;
            state.message = "";
            state.onConfirm = null;
        }
    }
});

export const { showAlert, closeAlert, confirmAction } = alertSlice.actions;
export default alertSlice.reducer;
