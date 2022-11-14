import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "./Slices/UserSlices"
import cartReducer from "./Slices/cartSlice"
import cartUI from "./Slices/cartUiSlice"

const persistConfig = {
    key: "root",
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    cartUI: cartUI
})

const persistedReducer = persistReducer(persistConfig,  rootReducer)

const store = configureStore({
    reducer: persistedReducer,
});


export default store
export const persistor = persistStore(store)