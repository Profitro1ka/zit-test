import {StateSchema} from "../../../../app/providers/StoreProvider";

export const getTasks = (state: StateSchema) => state.task.Tasks
export const getCurrentTask = (state: StateSchema) => state.task?.currentTask
