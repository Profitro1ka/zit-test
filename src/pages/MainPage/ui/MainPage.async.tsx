import {ComponentType, lazy} from "react";

export const MainPageAsync = lazy<ComponentType>(
    async () => await import('./MainPage')
        .then((module) => ({default: module.MainPage})),
);
