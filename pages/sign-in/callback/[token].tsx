import { useRouter } from "next/router";
import React from "react";

const SignInWithToken = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return (
    <>
      <h1>Token</h1>
      {query.token}
    </>
  );
};

export default SignInWithToken;
