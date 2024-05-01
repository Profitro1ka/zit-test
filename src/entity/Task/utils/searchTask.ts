import {ITask} from "../model/types/ITaskSliceSchema";

export const searchTask = (tasks: ITask[], uid: string): ITask | null => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === uid) {
            return tasks[i];
        }
        if (tasks[i].childTasks) {
            const result = searchTask(tasks[i].childTasks, uid);
            if (result) {
                return result;
            }
        }
    }
    return null;
}
