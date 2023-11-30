import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Importación corregida

const Success = () => {
  const router = useRouter();
  const value = router.query.public_key;

  useEffect(() => {
    if (value) {
      localStorage.setItem("pkey", value);
    }
  }, [value]); // Agregando value a las dependencias del useEffect

  return (
    <div>
      <div>Success {value}</div>
      <div>
        <Link href="/UserProfile">
          <a>PROFILE</a>
        </Link>{" "}
        {/* Uso correcto de Link */}
      </div>
    </div>
  );
};

export default Success;
