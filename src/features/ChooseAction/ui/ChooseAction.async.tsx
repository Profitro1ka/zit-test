import {ComponentType, lazy} from "react";
import type {IChooseActionProps} from "./ChooseAction";

export const ChooseActionAsync = lazy<ComponentType<IChooseActionProps>>(
    async () => await import('./ChooseAction')
        .then((module) => ({default: module.ChooseAction})),
);
