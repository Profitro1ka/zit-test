import {FC, memo, useCallback, useState} from 'react';
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getCurrentTask, ITask, TaskSliceActions, taskState} from "../../index";
import {Button, Select, TextArea, TextInput, Text, Flex} from "@gravity-ui/uikit";
import {useSelector} from "react-redux";
import {createUid} from "../../utils/createUid";
import {dateTimeParse, dateTime, DateTime} from '@gravity-ui/date-utils'
import {DatePicker} from '@gravity-ui/date-components';

type actionType = 'add' | 'edit'

export interface IEditTaskProps {
    actionType: actionType
    buttonText: string
    setIsOpen: (value: boolean) => void
}

export const EditTask: FC<IEditTaskProps> = memo((props) => {
    const {actionType, buttonText, setIsOpen}: IEditTaskProps = props
    const dispatch = useAppDispatch()
    const currentTask = useSelector(getCurrentTask) || {} as ITask
    const [taskName, setTaskName] = useState<string>(actionType === "edit" ? currentTask?.title : '')
    const [taskDescription, setTaskDescription] = useState<string>(actionType === "edit" ? currentTask?.description : '')
    const [taskState, setTaskState] = useState<taskState>(actionType === "edit" ? currentTask?.state : 'new')
    const [taskDate, setTaskDate] = useState<string>(actionType === "edit" ? currentTask?.date : dateTime().format('DD.MM.YYYY'))

    const editTask = useCallback(() => {
        dispatch(TaskSliceActions.updateTask({
            id: currentTask.id,
            description: taskDescription,
            title: taskName,
            state: taskState,
            date: taskDate
        }))
        console.log(taskDate)

        setIsOpen(false)
    }, [taskName, taskDescription, taskState, currentTask, taskDate])

    const addTask = useCallback(() => {
        dispatch(TaskSliceActions.addTask({
            parentId: currentTask?.id,
            newTask: {
                title: taskName,
                description: taskDescription,
                state: taskState,
                id: createUid(),
                childTasks: [],
                isSelected: false,
                date: taskDate
            }
        }))

        setIsOpen(false)
    }, [currentTask, taskName, taskDescription, taskState, taskDate])

    return (
        <Flex direction={'column'} width={800} gap={2} style={{padding: 10}}>
            <TextInput value={taskName}
                       size={'xl'} placeholder={'Название задачи'}
                       onChange={(event) =>
                           setTaskName(event.target.value)
                       }/>

            <TextArea value={taskDescription}
                      size={'xl'} placeholder={'Описание задачи'}
                      onChange={(event) =>
                          setTaskDescription(event.target.value)
                      }/>

            {actionType === "edit" &&
                <Select value={[taskState]}
                        onUpdate={(value) => setTaskState(value[0] as taskState)}
                        placeholder={'Выбор состояния'} size={'xl'} width={'auto'}>
                    <Select.Option value={'new'}>Новая</Select.Option>
                    <Select.Option value={'inWork'}>В работе</Select.Option>
                    <Select.Option value={'completed'}>Выполнено</Select.Option>
                </Select>
            }

            <DatePicker format={'DD.MM.YYYY'} value={dateTimeParse(taskDate, {format : 'DD.MM.YYYY'}) || dateTime()} onUpdate={(value) => {
                if (value) {
                    setTaskDate(value.format('DD.MM.YYYY'))
                }
            }} size={'xl'} placeholder={'Запланировать задачу'}/>


            <Button size={'xl'} onClick={() => {
                if (actionType === 'edit') {
                    editTask()
                } else if (actionType === 'add') {
                    addTask()
                }
            }}>
                <Text>{buttonText}</Text></Button>
        </Flex>
    );
});


