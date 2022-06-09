import API from "../api";

export function getHeaders() {
  const localHeader = JSON.parse(localStorage.getItem("usercredentials"));

  return localHeader;
}

export function getUserInformation() {
  const userinfo = JSON.parse(localStorage.getItem("userinformation"));

  return userinfo;
}

export async function getAllUsers() {
  try {
    const { data } = await API.get("users", {
      headers: getHeaders(),
    });
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

