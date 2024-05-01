import {ITask} from "../model/types/ITaskSliceSchema";

const selectChild = (tasks: ITask[]) => {
    if (!tasks) {
        return
    }
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].isSelected = true
        selectChild(tasks[i].childTasks)
    }
}

export const setSelectedTasks = (tasks: ITask[], uid: string) => {
    if (!tasks) {
        return
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === uid) {
            tasks[i].isSelected = !tasks[i].isSelected
            selectChild(tasks[i].childTasks)
        } else {
            setSelectedTasks(tasks[i].childTasks, uid)
        }
    }
}
