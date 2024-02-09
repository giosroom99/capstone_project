import { api } from "../../utils/apiCall";
import OrganizationThree from "./orgTree";
import ProfileCard from "./userProfileCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState();
  const [userData, setUserData] = useState();

  localStorage.setItem("userId", "4b0b9c0d-b181-4540-8e8a-0d9a5b0b5472");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fecthData = async () => {
      const data = await api.get(`user/${userId}`);
      setUserData(data);
    };
    fecthData();
  }, []);

  const roleData = "";

  return (
    <div className="container m-3">
      <div className="row justify-content-center ">
        <h4>Account information</h4>
        <div className="col-8">
          <ProfileCard />
        </div>
      </div>
      <div className="row justify-content-center">
        {" "}
        <OrganizationThree orgData={roleData} />
      </div>
    </div>
  );
}
