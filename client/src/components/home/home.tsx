import OrganizationThree from "./orgTree";
import ProfileCard from "./userProfileCard";

export default function Home() {
  const roleData = {
    r_id: "1fdd0f77-c8bd-43e8-ad9b-03ac95e3c1ad",
    r_name: "Manager",
    user_mngr_assigned_to_role: "e3a6211a-5eab-4d3d-b7dd-9c927fcd8979",
    users_reporting_mngr: [
      "24747d9e-eace-4f55-9fe5-7d3604319c3e",
      "39def820-7039-4d26-bfe1-f7a28dc0f548",
      "45e3e0f9-506b-4412-a32f-6ffa3515cc58",
      "e0062da2-42a9-4712-973a-9c21333ae109",
      "7c536ba3-a259-47e9-923d-3591e39c73e5",
    ],
  };

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
