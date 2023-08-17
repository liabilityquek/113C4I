"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <>
      {console.log(`manual login and social login session: ${JSON.stringify(session, null, 2)}`)}
    </>
  );
};
