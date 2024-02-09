export default function OrganizationThree(props) {
  const OrganizationData = props.orgData;
  return (
    <div className="container  mt-3 text-center">
      <div className="row justify-content-center">
        <div
          className="card border-primary mb-3 col-3"
          style={{ maxWidth: "18rem;" }}
        >
          <div className="card-header bg-transparent border-primary">
            Manager
          </div>
          <div className="card-body text-primary">
            <h5 className="card-title ">John Wal</h5>
            <p className="card-text">Team Lead</p>
          </div>
          <div className="card-footer bg-transparent border-warning">
            Send private message
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="card-group col-11">
          {OrganizationData.users_reporting_mngr.map((employee, index) => (
            <div
              key={index}
              className="card border-warning mb-3 mx-1 "
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-transparent border-warning">
                Employee
              </div>
              <div className="card-body text-warning">
                <h5 className="card-title">Niekeo LOo</h5>
                <p className="card-text">Reporting to John Wal</p>
              </div>
              <div className="card-footer bg-transparent border-warning">
                Footer
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
