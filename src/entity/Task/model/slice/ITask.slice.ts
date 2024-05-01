import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {ITask, ITaskSliceSchema} from '../types/ITaskSliceSchema'
import {createUid} from "../../utils/createUid";
import {setSelectedTasks} from "../../utils/setSelectedTasks";
import {getAllUnselectedTasks} from "../../utils/getAllUnselectedTasks";
import {searchTask} from "../../utils/searchTask";
import {LOCAL_STORAGE_USER_TASKS_KEY} from "../../../../shared/consts/localstorage";
import {dateTime} from "@gravity-ui/date-utils";



const initialState: ITaskSliceSchema = {
    Tasks: [{
        id: createUid(),
        title: 'test',
        description: 'test description',
        state: 'new',
        isSelected: false,
        childTasks: [],
        date: dateTime().format('DD.MM.YYYY')
    }]
};

const lastTasks = localStorage.getItem(LOCAL_STORAGE_USER_TASKS_KEY)

if(lastTasks){
    initialState.Tasks = JSON.parse(lastTasks)
}

interface IAddTaskArg {
    parentId?: string;
    newTask: ITask
}

export const TaskSlice = createSlice({
    name: 'Task',
    initialState,
    reducers: {
        deleteSelectedTask: (state) => {
            state.Tasks = getAllUnselectedTasks(state.Tasks)

            localStorage.setItem(LOCAL_STORAGE_USER_TASKS_KEY, JSON.stringify(state.Tasks))
        },

        setIsSelected: (state, action: PayloadAction<string>) => {
            setSelectedTasks(state.Tasks, action.payload)
        },

        setCurrentTask: (state, action: PayloadAction<ITask>) => {
            state.currentTask = action.payload
        },

        updateTask: (state, action: PayloadAction<Omit<ITask, 'isSelected' | 'childTasks'>>) => {
            const currentTask = searchTask(state.Tasks, action.payload.id)

            if (currentTask) {
                currentTask.title = action.payload.title
                currentTask.description = action.payload.description
                currentTask.state = action.payload.state
                currentTask.date = action.payload.date
            }

            localStorage.setItem(LOCAL_STORAGE_USER_TASKS_KEY, JSON.stringify(state.Tasks))
            state.currentTask = undefined
        },

        addTask: (state, action: PayloadAction<IAddTaskArg>) => {
            if (action.payload.parentId) {
                const currentTask = searchTask(state.Tasks, action.payload.parentId)

                if (currentTask) {
                    currentTask.childTasks.push(action.payload.newTask)
                }
            } else {
                state.Tasks.push(action.payload.newTask)
            }

            localStorage.setItem(LOCAL_STORAGE_USER_TASKS_KEY, JSON.stringify(state.Tasks))
            state.currentTask = undefined
        },
    },
});

// Action creators are generated for each case reducer function
export const {actions: TaskSliceActions} = TaskSlice;
export const {reducer: TaskSliceReducer} = TaskSlice;
