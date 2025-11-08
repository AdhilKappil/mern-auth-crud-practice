import api from "./axiosInstance";

export const loginUser = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  return response.data;
};

export const RegisterUser = async(data)=>{
    const response = await api.post("/users/register",{data})
    return response.data;
}

export const getUserProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};

export const deleteUser = async () => {
  const response = await api.delete("/user/delete");
  return response.data;
};
