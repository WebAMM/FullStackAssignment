/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import UserContext from "../../../context/UserContext";
import ErrorNotice from "../../misc/ErrorNotice";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { useSearchDebounce } from "../../../utills/Helper";

export default function TaskInsert({
  saveTask,
  closeModal,
  isEditMode,
  calledBy,
  TaskDetail,
}) {
  const [name, setName] = React.useState("");
  const [error, setError] = useState();
  const [dateChange, onDateChange] = React.useState(new Date());
  const [description, setDescription] = React.useState("");
  const [display, setDisplay] = React.useState(false);
  const [UsersInput, setUsersInput] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [creator, setcreator] = React.useState("");
  const [search, setSearch] = useSearchDebounce();

  const saveTaskData = (e) => {
    e.preventDefault();

    saveTask({ name, description, dateChange, creator });
  };
  const disableButton = () => {
    return !name || !description;
  };
  const onTextChange = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    if (isEditMode) {
      console.log("yes edit mode", TaskDetail);
      setName(TaskDetail.title);
      setDescription(TaskDetail.description);
      onDateChange(new Date(TaskDetail.published));
    }
  }, [TaskDetail]);

  return (
    <React.Fragment>
      <div className='modal' style={{ display: "block" }}>
        <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                {isEditMode ? "Edit" : "New"} Task
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={() => closeModal(false)}
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                  />
                )}
                <label htmlFor='product_name' className='form-label '>
                  Title
                </label>
                <input
                  id='product_name'
                  name='product_name'
                  value={name}
                  onChange={(e) => {
                    setDisplay(true);
                    setName(e.target.value);
                    setSearch(e.target.value);
                  }}
                  className='form-control'
                  placeholder='task ...'
                />
                <label htmlFor='description' className='form-label'>
                  Description
                </label>
                <textarea
                  id='description'
                  value={description}
                  className='form-control'
                  name='description'
                  onChange={onTextChange}
                  placeholder='Task description'
                  rows={10}
                  cols={50}
                  spellCheck={false}
                />
                <br />
                <div style={{ display: "flex" }}>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                    onClick={() => closeModal(false)}
                  >
                    Close
                  </button>
                  <button
                    disabled={disableButton()}
                    style={{ marginLeft: "3px" }}
                    className='btn btn-success'
                    onClick={(e) => saveTaskData(e)}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
