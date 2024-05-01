import {ITask} from "../model/types/ITaskSliceSchema";

export const getAllUnselectedTasks = (tasks: ITask[]): ITask[] => {
    if (!tasks) {
        return []
    }

    return tasks.filter((value) => {
        value.childTasks = getAllUnselectedTasks(value.childTasks)

        return !value.isSelected
    })
}
