export const API_URL = "http://192.168.0.99:71/GLOBAL/Controller/CCPP";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/Login.php?login&app_id=1",
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_PASSWORD(body){
  return{
    url: API_URL + "/Login.php?login&app_id=1",
    options:{
      method: 'PUT',
      body: JSON.stringify(body),
    },
  };
}


export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

