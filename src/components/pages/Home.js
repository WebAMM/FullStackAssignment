/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SweetAlert from "react-bootstrap-sweetalert";
import UserContext from "../../context/UserContext";
import AdminService from "../../services/adminService";
import moment from "moment";
import TaskInsert from "./Task/TaskInsert";
import toast from "react-hot-toast";
export default function Home() {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loadModal, setLoadModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskDetail, seteditTaskDetail] = useState(null);
  const [deleteRecordId, setDeleteRecordId] = useState(null);
  const [editRecordId, setEditRecordId] = useState(null);
  const countPerPage = 5;
  const columns = [
    {
      name: "Title",
      cell: (row) => <span width='30px'>{row.title}</span>,
    },
    {
      name: "description",
      selector: "description",
    },

    {
      name: "Status",
      selector: "status",
    },
    {
      name: (
        <button className='btn btn-success btn-sm' onClick={() => addTask()}>
          New Task
        </button>
      ),
      cell: (row) => {
        return (
          <div style={{ justifyContent: "space-between" }}>
            <span
              className='fa fa-pencil'
              onClick={() => editUserEntry(row)}
            ></span>
            <span
              className='fa fa-trash'
              style={{ marginLeft: "10px" }}
              onClick={() => deleteUserEntry(row._id)}
            ></span>
          </div>
        );
      },
    },
  ];
  const getTasksList = async () => {
    try {
      let res = await AdminService.adminTaskList(page - 1, countPerPage);
      console.log("first response", res);
      setData(res.data);
    } catch (error) {
      setData({});
    }
  };

  const editUserEntry = (record) => {
    seteditTaskDetail(record);
    setEditRecordId(record._id);
    setIsEditMode(true);
    setLoadModal(true);
  };
  const updateTask = async (data) => {
    try {
      console.log("inside update", data);
      let reqData = { ...data, title: data.name, published: data.dateChange };
      delete reqData._id;
      delete reqData.dateChange;
      delete reqData.creator;
      let resp = await AdminService.EditTask(editRecordId, reqData);
      setLoadModal(false);
      setEditRecordId(null);
      getTasksList();
      toast.success("Task Updated Successfully");
      // console.log("update resp", resp);
    } catch (err) {
      console.log("error update", err.message);
      toast.error(err.message);
    }
  };
  const saveTask = async (data) => {
    try {
      let reqData = { ...data, published: data.dateChange };
      await AdminService.newTaskEntry(reqData);
      setLoadModal(false);
      getTasksList();
      toast.success("Task Added Successfully");
      // console.log("resp", resp);
    } catch (err) {
      // console.log("error save", err.message);
      toast.error(err.message);
    }
  };
  const deleteUserEntry = (id) => {
    setDeleteRecordId(id);
    setShowAlert(true);
  };
  const addTask = async () => {
    setLoadModal(true);
    // let user = await AdminService.allUsersList();
    // console.log("user Liust", user);
    // setAllUsers(user.data.usersList);
  };
  const handleDeleteAlert = async (resp) => {
    console.log("resp", resp);
    setShowAlert(false);
    await AdminService.DeleteTask(deleteRecordId);
    getTasksList();
    toast.success("Task Deleted Successfully");
    // setDeleteRecordId(id);
  };
  const cancelDeleteAlert = () => {
    // console.log("resp", );
    setDeleteRecordId(null);
    setShowAlert(false);
  };

  useEffect(() => {
    getTasksList();
  }, [page]);

  return (
    <div className='page'>
      {data.data && data.data.length > 0 ? (
        <DataTable
          title={`Tasks List   
`}
          columns={columns}
          data={data.data}
          highlightOnHover
          pagination
          paginationServer
          paginationTotalRows={data.total}
          paginationPerPage={countPerPage}
          paginationComponentOptions={{
            noRowsPerPage: true,
          }}
          onChangePage={(page) => setPage(page)}
        />
      ) : (
        <button
          className='btn btn-success btn-sm'
          style={{ margin: "auto", left: "50%", right: "50%" }}
          onClick={() => addTask()}
        >
          Add New Task
        </button>
      )}
      <SweetAlert
        show={showAlert}
        warning
        showCancel
        confirmBtnText='Yes, delete it!'
        confirmBtnBsStyle='danger'
        title='Are you sure?'
        confirmButtonColor='#449c44d7'
        onConfirm={handleDeleteAlert}
        onCancel={cancelDeleteAlert}
      />
      {loadModal && (
        <TaskInsert
          closeModal={() => setLoadModal(false)}
          isEditMode={isEditMode}
          calledBy={"admin"}
          TaskDetail={editTaskDetail}
          saveTask={isEditMode ? updateTask : saveTask}
        />
      )}
    </div>
  );
}
