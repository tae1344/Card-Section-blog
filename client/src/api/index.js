import axios from 'axios';

const POST_SERVER = 'https://cardgramapp.herokuapp.com/api/posts';
const USER_SERVER = 'https://cardgramapp.herokuapp.com/api/users';

const API_PREFIX = 'http://localhost:5002';
const DEV_POST_SERVER = API_PREFIX + '/api/posts';
const DEV_USER_SERVER = API_PREFIX + '/api/users';

export const createPost = async (postData) => {
  try {
    await axios({
      method: "POST",
      data: postData,
      withCredentials: true,
      url: `${DEV_POST_SERVER}/create`,
    });
  } catch (error) {
    console.log(error);
  }
}

// post 가져오기
export const getPosts = async () => {
  try {
    return await axios({
      method: "GET",
      withCredentials: true,
      url: `${DEV_POST_SERVER}`,
    });
  } catch (error) {
    console.log(error);
  }
}
// 유저가 작성한 포스트 가져오기
export const getUserPosts = async (user) => {
  try {
    return await axios({
      method: "GET",
      withCredentials: true,
      url: `${DEV_POST_SERVER}/${user}/detail`,
    });

  } catch (error) {
    console.log(error);
  }
}

export const deletePost = async (id) => {
  try {
    await axios({
      method: 'DELETE',
      withCredentials: true,
      url: `${DEV_POST_SERVER}/${id}`,
    });
  } catch (error) {
    console.log(error);
  }
}


export const likePost = async (id) => {
  try {
    await axios({
      method: 'PATCH',
      withCredentials: true,
      url: `${DEV_POST_SERVER}/${id}/likePost`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = async (id, updatedPost) => {
  try {
    await axios({
      method: 'PATCH',
      data: updatedPost,
      //withCredentials: true,
      url: `${DEV_POST_SERVER}/${id}`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const usesrLogin = async (loginData) => {
  try {
    return await axios({
      method: "POST",
      data: loginData,
      withCredentials: true,
      url: `${DEV_USER_SERVER}/login`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const usesrLogout = async () => {
  try {
    return axios({
      method: "GET",
      withCredentials: true,
      url: `${DEV_USER_SERVER}/logout`,
    });
  } catch (error) {
    console.log(error);
  }
}

export const userResiter = async (inputData) => {
  try {
    return await axios({
      method: "POST",
      data: inputData,
      withCredentials: true,
      url: `${DEV_USER_SERVER}/register`,
    });
  } catch (error) {
    console.log(error);
  }
}
