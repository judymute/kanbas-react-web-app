import axios from "axios";
import {Module} from "./reducer";
// const COURSES_API = "https://kanbas-node-server-app-wpbi.onrender.com/api/courses";
// const MODULES_API = "https://kanbas-node-server-app-wpbi.onrender.com/api/modules";
axios.defaults.withCredentials = true
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const MODULES_API = `${API_BASE}/api/modules`;




export const deleteModule = async (moduleId: string) => {
  const response = await axios
    .delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId: any, module: Module) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const updateModule = async (module: Module) => {
  const response = await axios.
    put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};

export const findModulesForCourse = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);

  return response.data;
};

