import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  // Since data is initially undefined, check for data and data.project existence
  if (!data || !data.project) return <p>Loading project details...</p>;

  // Destructure the project data
  const { name, description, status, client, id: projectId } = data.project;

  return (
    <div className="mx-auto w-75 card p-5">
      <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
        Back
      </Link>

      <h1>{name}</h1>
      <p>{description}</p>

      <h5 className="mt-3">Project Status</h5>
      <p className="lead">{status}</p>

      {client && <ClientInfo client={client} />}

      <EditProjectForm project={data.project} />

      <DeleteProjectButton projectId={projectId} />
    </div>
  );
}
