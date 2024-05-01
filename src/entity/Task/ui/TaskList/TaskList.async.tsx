import {ComponentType, lazy} from "react";
import {ITaskProps} from "./TaskList";

export const TaskListAsync = lazy<ComponentType<ITaskProps>>(
    async () => await import('./TaskList')
        .then((module) => ({default: module.TaskList})),
);
