import { gql, useQuery } from "@apollo/client";
import React from "react";

const Test = () => {
  const testQuery = gql`
    query User($id: ID) {
      user(id: $id) {
        id
        email
        password
      }
    }
  `;
  const { loading, error, data } = useQuery(testQuery, {
    variables: { id: "1" },
  });
  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error:{error}</h3>;
  }
  return <div>{JSON.stringify(data.user)}</div>;
};

export default Test;
