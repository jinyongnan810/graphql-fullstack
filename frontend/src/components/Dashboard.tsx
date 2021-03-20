import { gql, useQuery } from "@apollo/client";
import React from "react";
const getPrivateDataQuery = gql`
  {
    private {
      id
      type
    }
  }
`;
const Dashboard = () => {
  const { loading, error, data } = useQuery(getPrivateDataQuery);
  if (loading) {
    return <div>Loading private data...</div>;
  }
  if (error) {
    return <div>Loading failed:{error}</div>;
  }
  return (
    <div className="card mt-2">
      <div className="card-body">{JSON.stringify(data)}</div>
    </div>
  );
};

export default Dashboard;
