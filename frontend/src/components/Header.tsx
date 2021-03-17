import React from "react";
import { Link } from "react-router-dom";

const Header = ({ signedIn }: { signedIn: Boolean }) => {
  return (
    <div>
      {signedIn && <Link to="/dashboard">Dashboard</Link>}
      {signedIn && <Link to="/">Sign Out</Link>}
      {!signedIn && <Link to="/signup">Sign Up</Link>}
      {!signedIn && <Link to="/signin">Sign In</Link>}
    </div>
  );
};

export default Header;
