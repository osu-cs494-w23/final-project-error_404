import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/passwordHash";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({

      async authorize(credentials) {
        const client = await connectToDB();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Invalid password or email");
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
