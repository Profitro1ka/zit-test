import {FC, memo} from 'react';
import {ToDoList} from "../../../widgets/ToDoList";

interface IMainPageProps {
}

export const MainPage: FC<IMainPageProps> = memo(() => {
    const props: IMainPageProps = {}


    return (
        <>
            <ToDoList/>
        </>
    );
});


