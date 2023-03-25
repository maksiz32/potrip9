import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import {Link} from "react-router-dom";
import * as React from "react";
import Preload from "../Units/UI/Preload";
import UsersTable from "../Units/UsersTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setUsers(data.data);
        console.log(data);
      })
      .catch((error) => {
        // ToDo: make myself alerts
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const blockUser = (User) => {
    setLoading(true);
    axiosClient.put(`/users/${User.id}/block`)
      .then(() => {
        getAllUsers();
      })
      .catch(error => {
        // ToDo: make myself alerts
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <div className="container-fluid">
      {loading
        ?
          <Preload />
        :
        <main>
          <div>
            <Link to="/users/new" className="btn btn-primary">Add New User</Link>
          </div>
          <UsersTable users={users} blockUser={blockUser} />
        </main>
      }
    </div>
  )
}
