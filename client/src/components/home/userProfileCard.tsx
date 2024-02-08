import { useEffect, useState } from "react";
import profileImage from "../../assets/img/profile.jpg";
import { api } from "../../utils/apiCall";
export default function ProfileCard() {
  const fakeUser = {
    f_name: "Cristina",
    l_name: "Brown",
    p_id: "cf6f96a7-fa71-4adc-a2bc-da86e7b1e209",
    email: "johnsonjulie@example.com",
    password: "EIQ%Lm4&@5",
  };
  const [userData, setUserData] = useState({
    f_name: "",
    l_nam: "",
    p_id: "",
    email: "",
    passwor: "",
  });

  useEffect(() => {
    const fecthData = async () => {
      const user = api.get("/user");

      setUserData(user);
    };
    fecthData();
  }, []);

  if (!fakeUser) {
    return (
      <div>
        <h1>OOPS! we couldnt get your info</h1>
      </div>
    );
  }
  return (
    <div className="card" style={{ width: "20rem" }}>
      <img src={profileImage} className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">
          {fakeUser.f_name} {fakeUser.l_name}
        </h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item fw-bold">{fakeUser.email}</li>
        <li className="list-group-item">Report to: Nickole D More</li>
        <li className="list-group-item">Claims</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Card link
        </a>
        <a href="#" className="card-link">
          Another link
        </a>
      </div>
    </div>
  );
}
