import React from "react";
import { Redirect } from "react-router";
interface AuthProps {
  loading: boolean;
  signedIn: boolean;
}

// const privateRoute = <P extends object>(Component: React.ComponentType<P>) =>
//   class PrivateRoute extends React.Component<P & AuthProps> {
//     render() {
//       const { loading, signedIn, ...props } = this.props as AuthProps;
//       return !loading && !signedIn ? (
//         <Redirect to="/" />
//       ) : (
//         <Component {...(props as P)} />
//       );
//     }
//   };

const privateRoute = <P extends object>(
  Component: React.ComponentType<P>
): React.FunctionComponent<P & AuthProps> => ({
  loading,
  signedIn,
  ...props
}: AuthProps) =>
  !loading && !signedIn ? <Redirect to="/" /> : <Component {...(props as P)} />;
export default privateRoute;
