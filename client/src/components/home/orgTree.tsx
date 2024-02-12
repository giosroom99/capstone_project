import { useEffect, useState } from "react";
import { api } from "../../utils/apiCall";
import { Link } from "react-router-dom";

export default function OrganizationThree(props: any) {
  const managerInfo = props.managerInfo;
  const userInfo = props.userInfo;
  var users_in_org;
  var manager_name;

  const [allUsers, setAllUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await api.get(`/user`);
      setAllUser(allUsers);
    };
    getAllUsers();
  }, []);

  if (!managerInfo && userInfo.role != "Manager") {
    return (
      <div>
        <h1>Nothing to see here</h1>
      </div>
    );
  }

  if (userInfo.role == "Manager") {
    manager_name = `${userInfo.f_name} ${userInfo.l_name}`
    users_in_org = userInfo.employees;
  } else {
    manager_name = getUserfullName(managerInfo.user_mngr_assigned_to_role);
    users_in_org = managerInfo.users_reporting_mngr;
  }

  function getUserfullName(id: string) {
    const foundUser = allUsers.find((user) => user.p_id === id);
    if (foundUser) {
      return `${foundUser.f_name} ${foundUser.l_name}`;
    } else {
      return "";
    }
  }

  return (
    <div className="container mt-3 text-center">
      {userInfo.role != "Manager" && 
        <div className="row justify-content-center">
        <div
          className="card border-primary mb-3 col-3"
          style={{ maxWidth: "18rem" }}
        >
          <div className="card-header bg-transparent border-primary">
            Manager
          </div>
          <div className="card-body text-primary">
            <h5 className="card-title ">
              {manager_name}
            </h5>
            <p className="card-text">Team Lead</p>
          </div>
          <div className="card-footer bg-transparent border-warning">
            <Link to={"/chat"}>
              <button className="btn btn-success">Send private message</button>
            </Link>
          </div>
        </div>
      </div>}
      <div className="row justify-content-center">
        <div className="col-10 mx-auto">
          <h2>Employees reporting to {manager_name}</h2>
          <div className="card-group ">
            {users_in_org.map((employee, index) => (
              <div
                key={index}
                className="card border-warning mb-3 mx-1 "
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header bg-transparent border-warning">
                  Employee
                </div>
                <div className="card-body">
                  <h5 className="card-title">{getUserfullName(employee)}</h5>
                  {/* <p className="card-text">
                    Reporting to{" "}
                    {getUserfullName(managerInfo.user_mngr_assigned_to_role)}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
