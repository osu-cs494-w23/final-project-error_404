import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AccountInfoPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session)

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === `unauthenticated`) {
    router.push(`/`);
  }

  return <p> Welcome to the Account</p>;
};

export default AccountInfoPage;
