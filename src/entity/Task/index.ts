export {TaskListAsync as Task} from './ui/TaskList/TaskList.async'
export type {ITaskSliceSchema, ITask, taskState} from './model/types/ITaskSliceSchema'
export {TaskSliceReducer, TaskSliceActions} from './model/slice/ITask.slice'
export {getTasks, getCurrentTask} from './model/selectors/Task.selectors'
