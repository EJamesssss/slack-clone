import { useEffect, useMemo, useState } from "react";
import { getAllUsers } from "../../Helpers/credentials";

const useFindUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [resultEmail, setResultEmail] = useState([{ id: 0, uid: "" }]);

  const getUsers = async () => {
    const { data } = await getAllUsers();
    setAllUsers(data);
  };
  useEffect(() => {
    getUsers();
  },[]);


  const findResult = useMemo(() => {
    return allUsers.find((findEmail) => {
      return findEmail.uid == email;
    });
    
  }, [ email]);

  useEffect(() => {
    if (findResult === undefined) {
      setResultEmail([{ id: 0, uid: "User does not exist" }]);
    } else {
      setResultEmail([findResult]);
    }
  }, [findResult]);



  return {
    showEmail: resultEmail,
    setEmail,
    email
  };
};

export default useFindUser;
