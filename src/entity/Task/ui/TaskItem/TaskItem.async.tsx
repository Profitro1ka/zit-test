import {ComponentType, lazy} from "react";
import {ITaskProps} from "./TaskItem";

export const TaskItemAsync = lazy<ComponentType<ITaskProps>>(
    async () => await import('./TaskItem')
        .then((module) => ({default: module.TaskItem})),
);
