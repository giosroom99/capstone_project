import { useEffect, useState } from "react";
import { api } from "../../utils/apiCall";
import { Link } from "react-router-dom";

export default function OrganizationThree(props: any) {
  const managerInfo = props.managerInfo;

  const [allUsers, setAllUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await api.get(`/user`);
      setAllUser(allUsers);
    };
    getAllUsers();
  }, []);

  if (!managerInfo) {
    return (
      <div>
        <h1>Nothing to see here</h1>
      </div>
    );
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
              {getUserfullName(managerInfo.user_mngr_assigned_to_role)}
            </h5>
            <p className="card-text">Team Lead</p>
          </div>
          <div className="card-footer bg-transparent border-warning">
            <Link to={"/chat"}>
              <button className="btn btn-success">Send private message</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 mx-auto">
          <div className="card-group ">
            {managerInfo.users_reporting_mngr.map((employee, index) => (
              <div
                key={index}
                className="card border-warning mb-3 mx-1 "
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header bg-transparent border-warning">
                  Employee
                </div>
                <div className="card-body text-warning">
                  <h5 className="card-title">{getUserfullName(employee)}</h5>
                  <p className="card-text">
                    Reporting to{" "}
                    {getUserfullName(managerInfo.user_mngr_assigned_to_role)}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-warning">
                  Footer
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
