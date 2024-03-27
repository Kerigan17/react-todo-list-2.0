import React, {useEffect, useState} from "react";
import {baseURL} from "../../config.mjs";
import axios from "axios";
export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/tasks/all-tasks`)
            .then(res => {
                setTasks(res.data);
                console.log(res.data)
            })
    }, []);

    return(
        <>
            <h2>Tasks</h2>
            <div className={'tasks'}>

            </div>
        </>
    )
}