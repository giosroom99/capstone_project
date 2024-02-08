import ProfileCard from "./userProfileCard";

export default function Home() {
  return (
    <div className="container m-4">
      <div className="row"></div>
      <div className="row">
        <div className="col-6">
          <ProfileCard />
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  );
}
