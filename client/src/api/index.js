import axios from 'axios';

const POST_SERVER = 'https://cardgramapp.herokuapp.com/api/posts';
const USER_SERVER = 'https://cardgramapp.herokuapp.com/api/users';

export const createPost = async (postData) => {
  try {
    await axios({
      method: "POST",
      data: postData,
      withCredentials: true,
      url: `${POST_SERVER}/create`,
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
      url: `${POST_SERVER}`,
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
      url: `${POST_SERVER}/${user}/detail`,
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
      url: `${POST_SERVER}/${id}`,
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
      url: `${POST_SERVER}/${id}/likePost`,
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
      url: `${POST_SERVER}/${id}`,
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
      url: `${USER_SERVER}/login`,
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
      url: `${USER_SERVER}/logout`,
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
      url: `${USER_SERVER}/register`,
    });
  } catch (error) {
    console.log(error);
  }
}