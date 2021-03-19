import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
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
  setSignedIn,
  setSignedOut,
  setLoading,
}: {
  setSignedIn: Function;
  setSignedOut: Function;
  setLoading: Function;
}) => {
  const { client, loading, error, data } = useQuery(userQuery);
  useEffect(() => {
    if (!loading) {
      setLoading();
    }
    if (data?.user.id) {
      setSignedIn();
    }
    // eslint-disable-next-line
  }, [loading]);
  const [signOut] = useMutation(signOutMutation);
  const onSignout = async () => {
    await signOut();
    await client.clearStore();
    setSignedOut();
  };
  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>Error:{error}</h3>;
  }

  return (
    <div>
      {data.user.email && (
        <Link to="/dashboard">{data.user.email}'s Dashboard</Link>
      )}
      {data.user.email && (
        <Link to="/" onClick={(e) => onSignout()}>
          Sign Out
        </Link>
      )}
      {!data.user.email && <Link to="/signup">Sign Up</Link>}
      {!data.user.email && <Link to="/signin">Sign In</Link>}
    </div>
  );
};

export default Header;
