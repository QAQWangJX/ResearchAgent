import { configureStore } from "@reduxjs/toolkit";

import systemSlice  from "./slice/SystemSlice";

export default configureStore({
    reducer: {
        system: systemSlice
    }
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(LoggerMiddleware, Logger2Middleware)
})

