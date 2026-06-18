import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const getTasks = async () => {
  return await axios.get(API_URL);
};

export const createTask = async (taskData) => {
  return await axios.post(API_URL, taskData);
};

export const updateTask = async (id, taskData) => {
  return await axios.put(`${API_URL}/${id}`, taskData);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};