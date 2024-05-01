import {FC, memo, useCallback, useRef, useState} from 'react';
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {ArrowToggle, Card, Checkbox, Flex, Text} from "@gravity-ui/uikit";
import {ITask} from "../../model/types/ITaskSliceSchema";
import {TaskList} from "../TaskList/TaskList";
import {TaskSliceActions} from "../../model/slice/ITask.slice";
import {dateTimeParse} from "@gravity-ui/date-utils";


export interface ITaskProps {
    task: ITask
    isSelected?: boolean
    onClick: (value: boolean) => void
}

type direction = 'top' | 'bottom'

export const TaskItem: FC<ITaskProps> = memo((props) => {
    const {task, isSelected, onClick}: ITaskProps = props
    const [direction, setDirection] = useState<direction>('top')
    const dispatch = useAppDispatch()
    const toggle = useRef<HTMLDivElement | null>(null)


    const setCurrentTask = useCallback((task: ITask, event: EventTarget) => {
        if (toggle.current === event) {
            dispatch(TaskSliceActions.setCurrentTask(task))
            onClick(true)
        }
    }, [])



    return (
        <>
            <Card height={'auto'} id={task.id}>
                <Flex ref={toggle} height={'auto'} alignItems={"center"} justifyContent={"space-around"} gap={10} style={{padding: 10}}
                      onClick={(event) => {
                          setCurrentTask(task, event.target)
                      }}>

                    <Checkbox checked={isSelected ? isSelected : task.isSelected} disabled={isSelected}
                              onUpdate={() => dispatch(TaskSliceActions.setIsSelected(task.id))} size={'l'}/>

                    <Text style={{fontSize: 26}}>{task.title}</Text>
                    <Text style={{fontSize: 26}}>{task.description}</Text>

                    <Text style={{fontSize: 26}}>{task.date}</Text>

                    <div style={{cursor: 'pointer'}}
                         onClick={() => setDirection(direction === "top" ? 'bottom' : 'top')}>
                        <ArrowToggle size={32} direction={direction}/>
                    </div>
                </Flex>
            </Card>

            <div style={{width: '95%', position: 'relative', left: '5%'}}>
                {direction === 'bottom' &&
                    <TaskList isAllSelected={isSelected ? isSelected : task.isSelected} tasks={task.childTasks}
                              onClick={onClick}/>}
            </div>
        </>
    );
});


