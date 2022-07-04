import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Checkout = () => {
  const router = useRouter();
  const { cartId } = router.query;

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== router.asPath) {
        alert("Are you Sure");
        console.log(router.asPath);
        return false;
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return <div>{cartId}</div>;
};

export default Checkout;
