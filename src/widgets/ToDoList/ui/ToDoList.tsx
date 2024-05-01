import {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch} from "../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getTasks, TaskSliceActions} from "../../../entity/Task";
import {TaskList} from "../../../entity/Task/ui/TaskList/TaskList";
import {Button, Flex, Modal, Text} from "@gravity-ui/uikit";
import {ChooseAction} from "../../../features/ChooseAction";
import {EditTask} from "../../../entity/Task/ui/EditTask/EditTask";

interface IToDoListProps {
}

export const ToDoList: FC<IToDoListProps> = memo(() => {
    const dispatch = useAppDispatch()
    const tasks = useSelector(getTasks)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [addIsOpen, setAddIsOpen] = useState<boolean>(false)

    const deleteTask = useCallback(() => {
        dispatch(TaskSliceActions.deleteSelectedTask())
    }, [tasks])


    return (
        <>
            <Flex direction={"column"} gap={5} style={{ margin : 15}}>
                <Text style={{fontSize: 30, fontWeight: 700, }}>Новые:</Text>
                <TaskList tasks={tasks.filter(value => value.state === "new")} onClick={setIsOpen}/>
            </Flex>

            <Flex direction={"column"} gap={5} style={{ margin : 15}}>
                <Text style={{fontSize: 30, fontWeight: 700}}>В работе:</Text>
                <TaskList tasks={tasks.filter(value => value.state === "inWork")} onClick={setIsOpen}/>
            </Flex>

            <Flex direction={"column"} gap={5} style={{ margin : 15}}>
                <Text style={{fontSize: 30, fontWeight: 700}}>Выполненые:</Text>
                <TaskList tasks={tasks.filter(value => value.state === "completed")} onClick={setIsOpen}/>
            </Flex>


            <Flex gap={5} style={{margin: 20}}>
                <Button size={"xl"} onClick={() => setAddIsOpen(true)}><Text>Добавить</Text></Button>
                <Button size={"xl"} onClick={deleteTask}><Text color={'danger'}>Удалить выбранное</Text></Button>
            </Flex>

            <Modal open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                <EditTask buttonText={'Создать'} actionType={"add"} setIsOpen={setAddIsOpen}/>
            </Modal>

            <ChooseAction setIsOpen={setIsOpen} isOpen={isOpen}/>
        </>
    );
});


