import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
const signUpMutaion = gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
const Signup = ({ setSignedIn }: { setSignedIn: Function }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useMutation(signUpMutaion);
  const history = useHistory();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signUp({
        variables: { email: email.trim(), password: password.trim() },
      });
    } catch (error) {
      alert(error.message);
      return;
    }
    setSignedIn(true);
    history.push("/dashboard");
  };
  return (
    <div className="card col-6 p-3 position-absolute top-50 start-50 translate-middle">
      <div className="card-title">Sign Up</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-lable">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-lable">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-large btn-success">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
