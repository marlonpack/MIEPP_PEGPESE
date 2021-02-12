import React, {useState} from "react";

import { TOKEN_POST } from "../src/api";
// import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();
export const UserStorage = ({ children }) => {
  const [data, setData] = useState();
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      // window.localStorage.removeItem("token");
      // navigate("/login");
    },
    []
    // [navigate]
  );

  async function userLogin(username, password) {
  try{
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({
        'user': username,
        'password': password,
      });
      const tokenRes = await fetch(url, options);
      const json = await tokenRes.json();
         setData(json.data)
         if(json.error === true) setError(json.message)
          
    }
     catch(err) {
      setError(err.message);
      setLogin(false);
    } 
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};