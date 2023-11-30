// pages/login.js
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Success() {
  const router = useRouter();
  const value = router.query.public_key;
  useEffect(() => {
    if (value) localStorage.setItem("pkey", value);
  }, []);

  return (
    <div>
      <div>Success {value}</div>
      <div>
        <a href="/UserProfile">PROFILE</a>
      </div>
    </div>
  );
}

export default Success;
