import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserAuth from "./UserAuth/UserAuth";
import TaskList from './TaskList/TaskList';
import Modal from "./Modal/Modal";

export default function App() {
    const [userId, setUserId] = useState('66002286a811cd8711c82455');
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!auth) navigate('/auth');
        else navigate('/');
    }, [navigate, auth]);

    function handleAuth(user) {
        setUserId(user);
        setAuth(true);
    }

    function closeOpenModal(event) {
        setOpenModal(!openModal);
    }

    return (
        <>
            <Routes>
                <Route path={'/'} element={<TaskList userId = {userId} openModal={closeOpenModal}/>}/>
                <Route path={'/auth'} element={<UserAuth onAuth = {handleAuth}/> }/>
                <Route path={'*'} element={<Navigate to = '/' />}/>
            </Routes>
            {openModal && <Modal closeModal={closeOpenModal} userId={userId}/>}
        </>
    )
}