import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer"

// 👇 Create and export the Redux store
const store = configureStore({
  reducer: {

    auth: authReducer,
  }
})

export default store