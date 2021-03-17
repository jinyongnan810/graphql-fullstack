import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const userQuery = gql`
  {
    user {
      id
      email
    }
  }
`;
const signOutMutation = gql`
  mutation signout {
    signout {
      id
      email
    }
  }
`;
const Header = ({
  signedIn,
  setSignedIn,
  setSignedOut,
}: {
  signedIn: Boolean;
  setSignedIn: Function;
  setSignedOut: Function;
}) => {
  const [currentUser, setCurrentUser] = useState({ id: "", email: "" });
  const { loading, error, data } = useQuery(userQuery);
  const [signOut] = useMutation(signOutMutation);
  const onSignout = async () => {
    await signOut();
    setSignedOut();
  };
  if (!signedIn) {
    if (loading) {
      return <h3>Loading...</h3>;
    }
    if (error) {
      return <h3>Error:{error}</h3>;
    }
    if (data.user.id) {
      setSignedIn();
      setCurrentUser(data.user);
    }
  }

  return (
    <div>
      {signedIn && <Link to="/dashboard">{currentUser.email}'s Dashboard</Link>}
      {signedIn && (
        <Link to="/" onClick={onSignout}>
          Sign Out
        </Link>
      )}
      {!signedIn && <Link to="/signup">Sign Up</Link>}
      {!signedIn && <Link to="/signin">Sign In</Link>}
    </div>
  );
};

export default Header;
