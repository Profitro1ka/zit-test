import {ComponentType, lazy} from "react";
import {IEditTaskProps} from "./EditTask";

export const EditTaskAsync = lazy<ComponentType<IEditTaskProps>>(
    async () => await import('./EditTask')
        .then((module) => ({default: module.EditTask})),
);
