import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { commerce } from "../../_app";

const SignInWithToken = () => {
  const router = useRouter();
  const query = router.query;

  const handleUserSignIn = async (token: string) => {
    commerce.customer
      .getToken(token)
      .then((jwt) => {
        console.log(jwt);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (router.query.token) {
      handleUserSignIn(router.query.token.toString());
    }
  }, [router.query]);

  console.log(query);
  return (
    <>
      <h1>Token</h1>
      {query.token}
    </>
  );
};

export default SignInWithToken;
