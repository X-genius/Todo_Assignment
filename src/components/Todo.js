import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from '../actions/index';
import todoAnimationGif from '../images/animation_500.gif';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './Todo.css';

function Todo() {
  const [inputData, setInputData] = useState({
    titleData: '',
    descriptionData: '',
  });
  const list = useSelector((state) => state.todoReducers.list);
  const dispatch = useDispatch();

  function handleChange(evt) {
    const value = evt.target.value;
    setInputData({
      ...inputData,
      [evt.target.name]: value,
    });
  }

  return (
    <div className="todo-component">
      <div className="add-card-container">
        <div className="add-card">Add card</div>
        <input
          type="text"
          placeholder="Title"
          className="title-placeholder"
          name="titleData"
          value={inputData.titleData}
          onChange={handleChange}
        />
        <textarea
          placeholder="Description"
          className="description-placeholder"
          name="descriptionData"
          value={inputData.descriptionData}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="add-btn"
          onClick={() =>
            dispatch(
              addTodo(inputData),
              setInputData({ titleData: '', descriptionData: '' })
            )
          }
        >
          Add
        </button>
      </div>

      <img
        src={todoAnimationGif}
        className="todo-Animation-class"
        alt="todo-animation"
      />

      <div className="row-container">
        <div className="col-container-1">Pending</div>
        <div className="col-container-2">In Progress</div>
        <div className="col-container-3">Completed</div>
      </div>

      {list.map((listData, index) => (
        <DragDropContext>
          <Droppable droppableId="cardData">
            {(provided) => {
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Draggable
                  key={listData.id}
                  draggableId={listData.id}
                  index={index}
                >
                  {(newProvided) => {
                    <div
                      className="card-data"
                      key={listData.id}
                      {...newProvided.draggableProps}
                      {...newProvided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <div className="title-data">
                        {listData.data.titleData}
                      </div>
                      <div className="description-data">
                        {listData.data.descriptionData}
                      </div>
                      <button
                        type="submit"
                        className="delete-btn"
                        onClick={() => dispatch(deleteTodo(listData.id))}
                      >
                        Delete
                      </button>
                    </div>;
                  }}
                </Draggable>
              </div>;
            }}
          </Droppable>
        </DragDropContext>
      ))}
    </div>
  );
}

export default Todo;
