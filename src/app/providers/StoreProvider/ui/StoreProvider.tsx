import {FC, ReactNode, useMemo} from 'react';
import {Provider} from 'react-redux';
import {createStore} from "../config/store";

interface StoreProviderProps {
    children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = (props) => {
    const {children} = props

    const store = useMemo(() => createStore(),
        [])

    return (
        <Provider store={store}>{children}</Provider>
    );
};

