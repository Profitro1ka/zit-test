import {FC, memo, useState} from 'react';
import {Button, Flex, Modal, Text} from "@gravity-ui/uikit";
import {EditTask} from "../../../entity/Task/ui/EditTask/EditTask";


export interface IChooseActionProps {
    setIsOpen: (value: boolean) => void;
    isOpen: boolean
}

export const ChooseAction: FC<IChooseActionProps> = memo((props) => {
    const {setIsOpen, isOpen}: IChooseActionProps = props
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [addIsOpen, setAddIsOpen] = useState<boolean>(false)

    return (
        <>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Flex gap={3} height={100} alignItems={"center"} style={{padding: 20}}>
                    <Button size={'xl'} onClick={() => {
                        setIsOpen(false)
                        setAddIsOpen(true)
                    }}><Text>Создать подзадачу</Text></Button>

                    <Button size={'xl'} onClick={() => {
                        setIsOpen(false)
                        setEditIsOpen(true)
                    }}><Text color={'warning-heavy'}>Редактировать задачу</Text></Button>
                </Flex>
            </Modal>

            <Modal open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                <EditTask buttonText={'Создать'} actionType={"add"} setIsOpen={setAddIsOpen}/>
            </Modal>

            <Modal open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                <EditTask buttonText={'Редактировать'}  actionType={"edit"} setIsOpen={setEditIsOpen}/>
            </Modal>
        </>
    );
});


