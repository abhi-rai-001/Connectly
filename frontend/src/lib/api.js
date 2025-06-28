import { axiosInstance } from "./axios.js";

export const signup = async (userData) => {
  const res = await axiosInstance.post("/auth/signup", {
    fullname: userData.fullname,
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboard", userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axiosInstance.post("/auth/login", {
    email: userData.email,
    password: userData.password,
  });
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const getOutgoingFriendReq = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  console.log("Data is",res)
  return res.data;
};

export const sendFriendReq = async (userId) => {

  const res = await axiosInstance.post(`/users/friend-req/${userId}`);
  return res.data;
};

export const acceptFriendReq = async (userId) => {
  const res = await axiosInstance.put(`/users/friend-req/${userId}/accept`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get('/users/friend-requests');
  console.log("Data",res.data)
  return res.data;
  
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get('/chat/token');
  return res.data;
};

