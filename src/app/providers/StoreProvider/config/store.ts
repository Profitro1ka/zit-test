import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {rtkApi} from "../../../../shared/api/rtkApi"
import {TaskSliceReducer} from "../../../../entity/Task";



export const createStore = () => {
    const rootReducers = {
        task: TaskSliceReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    return configureStore({
        reducer: combineReducers(rootReducers),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({}).concat(rtkApi.middleware),
    })
}


export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
