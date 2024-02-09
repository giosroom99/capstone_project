import OrganizationTree from "./orgTree";
import ProfileCard from "./userProfileCard";

export default function Home() {
  const organizationData = {
    r_id: "dsdsdsffg",
    r_name: "Manager",
    user_mngr_assigned_to_role: "dskdn",
    users_reporting_mngr: ["1", "2", "3"],
  };

  return (
    <div className="container m-4">
      <div className="row"></div>
      <div className="row">
        <div className="col-6">
          <ProfileCard />
        </div>
        <div className="col-6">
          {" "}
          <OrganizationTree roleData={organizationData} />
        </div>
      </div>
    </div>
  );
}
