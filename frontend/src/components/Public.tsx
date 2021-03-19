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
  return <div>{JSON.stringify(data)}</div>;
};

export default Public;
