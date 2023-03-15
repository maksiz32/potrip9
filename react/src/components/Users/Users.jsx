import UserView from "./UserView";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";

export default function Users() {
  const [users, stUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  return (
    <div>
      {/*{*/}
      {/*  usersList.map(User => {*/}
      {/*    return <UserView />;*/}
      {/*  })*/}
      {/*}*/}
      Users
    </div>
  )
}
