import Image from "next/image";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user2 from "../../assets/images/users/user2.jpg";
import user4 from "../../assets/images/users/user4.jpg";


const tableData = [
  {
    avatar: user2,
    name: "Will Bowles",
    github: "https://github.com/vvillbiii",
    project: "Encode Club",
    status: "done",
    // weeks: "35",
    // budget: "95K",
  },
  {
    avatar: user4,
    name: "Jack Liu",
    github: "https://github.com/bayesdj",
    project: "Encode Club",
    status: "done",
    // weeks: "35",
    // budget: "95K",
  },
  {
    avatar: user2,
    name: "Gabe",
    github: "https://github.com/gohyun14",
    project: "Encode Club",
    // status: "holt",
    // weeks: "35",
    // budget: "95K",
  },
  {
    avatar: user4,
    name: "Ndu Ifeanyi",
    github: "https://github.com/ross102",
    project: "Encode club",
    // status: "pending",
    // weeks: "35",
    // budget: "95K",
  },
  
];

const ProjectTables = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Project </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the project
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Team members</th>
                <th>Bootcamp</th>

                <th>Status</th>
                {/* <th>Weeks</th>
                <th>Budget</th> */}
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <Image
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.github}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.project}</td>
                  <td>
                    {tdata.status === "pending" ? (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    ) : tdata.status === "holt" ? (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3" />
                    )}
                  </td>
  
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
