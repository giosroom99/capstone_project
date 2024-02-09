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
    <div>
      <div className="card mb-3" style={{ maxWidth: "540px;" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={profileImage}
              className="img-fluid rounded-start"
              alt="..."
            ></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {" "}
                {fakeUser.f_name} {fakeUser.l_name}
              </h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">{fakeUser.email}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Report to: Nickole D More
                </small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">Claims</small>
              </p>
            </div>
            <div className="card-body">
              <a href="#" className="card-link">
                Edit profile
              </a>
              <a href="#" className="card-link">
                Share
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
