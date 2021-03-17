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
  const [signIn, { data, error }] = useMutation(signInMutaion);
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Signin</button>
    </form>
  );
};

export default Signin;
