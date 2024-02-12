import { api } from "../../utils/apiCall";
import OrganizationThree from "./orgTree";
import ProfileCard from "./userProfileCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fecthData = async () => {
      const data = await api.get(`user/${userId}`);

      setUserData(data);
    };
    fecthData();
  }, []);

  if (!userData) {
    return (
      <div>
        <h1>No user data </h1>
      </div>
    );
  }

  return (
    <div className="container m-3">
      <div className="row justify-content-center ">
        <h4 className="text-center">Account information</h4>
        <div className="col-8">
          <ProfileCard userInfo={userData} />
        </div>
      </div>
      <div className="row justify-content-center">
        {" "}
        <OrganizationThree managerInfo={userData.manager_info} userInfo={userData} />
      </div>
    </div>
  );
}
