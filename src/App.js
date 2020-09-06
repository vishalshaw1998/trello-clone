import React, { useState } from "react";
import initialData from "./initial-data";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: lightblue;
    height: auto;
    min-height: 300px;
`;

function App() {
    const [data, setdata] = useState(initialData);
    function onDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];
        console.log(start);
        console.log(finish);
        if (start === finish) {
            const newTaskIds = [...start.taskIds];
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };
            setdata(newData);
        } else {
            const startTaskIds = [...start.taskIds];
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds,
            };
            const finishTaskIds = [...finish.taskIds];
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };
            setdata(newData);
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1 style={{ textAlign: "center" }}>Trello Clone Using React</h1>
            <Container>
                {initialData.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map((tasksId) => {
                        return data.tasks[tasksId];
                    });
                    return (
                        <Column key={column.id} column={column} tasks={tasks} />
                    );
                })}
            </Container>
        </DragDropContext>
    );
}

export default App;
