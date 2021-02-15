import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export const API_URL = "http://192.168.0.99:71/GLOBAL/Controller/CCPP";


// function User(){
//   const {data} = useContext(UserContext);
//   return {session : data.session, id: data.id}
// }

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


export function USER_GET_PHOTO(session, id) {
//  const {session, id }= User();
  // data.administrator
  return {
    url: API_URL + "/EmployeePhoto.php?AUTH="+session + "&app_id=1&id=" +id,
    options: {
      method: "GET",
    },
  };
}

