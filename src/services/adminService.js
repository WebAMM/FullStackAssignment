// import validateEmail from "../utils/validateEmail";
import {
  ADDTASK,
  EDITTASK,
  TASKLIST,
  Nutritionix,
  DELETETASKENTRY,
} from "../urls/APIURLS";
import Axios from "axios";

const AdminService = {
  async adminTaskList(page, size = 3) {
    return await Axios.get(`${TASKLIST}?page=${page}&size=${size}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
  async DeleteTask(id) {
    return await Axios.delete(`${DELETETASKENTRY}/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
  async EditTask(id, Detail) {
    return await Axios.post(`${EDITTASK}/${id}`, Detail, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },

  async saveUserTaskById(Detail) {
    return await Axios.post(ADDTASK, Detail, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
  async newTaskEntry(Detail) {
    return await Axios.post(ADDTASK, Detail, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    });
  },
};

export default AdminService;
