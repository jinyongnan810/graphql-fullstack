import { gql, useQuery } from "@apollo/client";
import React from "react";
const getPublicDataQuery = gql`
  {
    public {
      id
      type
    }
  }
`;
const Public = () => {
  const { loading, error, data } = useQuery(getPublicDataQuery);
  if (loading) {
    return <div>Loading public data...</div>;
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

export default Public;
