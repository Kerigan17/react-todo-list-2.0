import {configureStore} from "@reduxjs/toolkit";
import columnReducer from "../features/columns/columns-slice"

export const store = configureStore({
    reducer: {
        columns: columnReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
