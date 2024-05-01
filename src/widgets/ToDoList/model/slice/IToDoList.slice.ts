import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IToDoListSliceSchema} from '../types/IToDoListSliceSchema'


const initialState: IToDoListSliceSchema = {
    test: ''
};

export const ToDoListSlice = createSlice({
    name: 'ToDoList',
    initialState,
    reducers: {
        testReducer: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: ToDoListSliceActions} = ToDoListSlice;
export const {reducer: ToDoListSliceReducer} = ToDoListSlice;
