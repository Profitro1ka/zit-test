import {ComponentType, lazy} from "react";

export const ToDoListAsync = lazy<ComponentType>(
    async () => await import('./ToDoList')
        .then((module) => ({default: module.ToDoList})),
);
