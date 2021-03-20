import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
const signInMutaion = gql`
  mutation signin($email: String, $password: String) {
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`;
const Signin = ({ setSignedIn }: { setSignedIn: Function }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, { error }] = useMutation(signInMutaion);
  const history = useHistory();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await signIn({
      variables: { email: email.trim(), password: password.trim() },
    });
    if (error) {
      throw new Error(error.message);
    }
    setSignedIn(true);
    history.push("/dashboard");
  };
  return (
    <div className="card col-6 p-3 position-absolute top-50 start-50 translate-middle">
      <div className="card-title">Sign In</div>
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
            <div className="form-text">
              The email will be kept secret to other users.
            </div>
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
          <button className="btn btn-large btn-success">Signin</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
