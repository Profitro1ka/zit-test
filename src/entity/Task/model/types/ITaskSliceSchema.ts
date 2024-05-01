
export type taskState = 'inWork' | 'completed' | 'new'

export interface ITask {
    id: string;
    title: string;
    description: string;
    state: taskState;
    childTasks: ITask[];
    isSelected: boolean;
    date: string
}

export interface ITaskSliceSchema {
    Tasks: ITask[];
    currentTask?: ITask
}
