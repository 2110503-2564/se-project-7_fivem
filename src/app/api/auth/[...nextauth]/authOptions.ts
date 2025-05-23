import { AuthOptions } from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from '@/libs/userLogIn';
export const authOptions: AuthOptions = {
  providers: [
      CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              if (!credentials) {
                  return null;
              }
              const user = await userLogIn(credentials.email, credentials.password);
              return user || null;
          }
      })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    }
  },
  pages: {
      signIn: "/api/auth/signin",
  }
  
};