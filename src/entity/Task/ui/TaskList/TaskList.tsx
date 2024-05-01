import {FC, memo } from 'react';
import {ITask} from "../../model/types/ITaskSliceSchema";
import {TaskItem} from "../TaskItem/TaskItem";
import {Flex} from "@gravity-ui/uikit";

export interface ITaskProps {
    tasks: ITask[];
    isAllSelected?: boolean;
    onClick: (value: boolean)=>void
}

export const TaskList: FC<ITaskProps> = memo((props) => {
    const {tasks, isAllSelected, onClick}: ITaskProps = props

    return (
        <Flex direction={"column"} gap={2}>
            {tasks.map(value =>
                <TaskItem key={value.id} isSelected={isAllSelected} task={value} onClick={onClick}/>
            )}
        </Flex>
    );
});


