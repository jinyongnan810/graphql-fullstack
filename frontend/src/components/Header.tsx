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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Graphql-React
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {data.user.email && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  {data.user.email}'s Dashboard
                </Link>
              </li>
            )}
            {data.user.email && (
              <li className="nav-item">
                <Link to="/" onClick={(e) => onSignout()} className="nav-link">
                  Sign Out
                </Link>
              </li>
            )}
            {!data.user.email && (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
            )}
            {!data.user.email && (
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
