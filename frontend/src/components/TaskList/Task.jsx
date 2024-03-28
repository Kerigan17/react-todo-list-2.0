import {Draggable} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

export default function Task({task, index}){
    return(
        <Draggable draggableId = {task._id} index = {index}>
            {(provided)=> (
                <div className={'task'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref = {provided.innerRef}
                >
                    <p>{task.title}</p>
                </div>
            )}
        </Draggable>
    )
}