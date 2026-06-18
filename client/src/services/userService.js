import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/users`;

export const createUser = async (
  userData
) => {
  return await axios.post(
    API_URL,
    userData
  );
};

export const loginUser = async (
  email,
  password
) => {
  return await axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );
};

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const updateUser = async (
  id,
  userData
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    userData
  );
};

export const deleteUser = async (
  id
) => {
  return await axios.delete(
    `${API_URL}/${id}`
  );
};

// console.log(
//   import.meta.env.VITE_API_URL
// );