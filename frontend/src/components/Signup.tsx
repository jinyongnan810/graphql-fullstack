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
  const [signUp, { error }] = useMutation(signUpMutaion);
  const history = useHistory();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await signUp({
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
      <button>Signup</button>
    </form>
  );
};

export default Signup;
