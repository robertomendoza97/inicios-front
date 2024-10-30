import { JWTPayload, signInWithCredentials } from "@/src/auth";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Usuario",
          type: "email",
          placeholder: "usuario@usuario.com"
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "********"
        }
      },
      async authorize(
        credentials: Record<string, string> | undefined
      ): Promise<User | null> {
        const data = await signInWithCredentials(
          credentials!.email,
          credentials!.password
        );

        if (data.statusCode >= 400) {
          return null;
        }

        const {
          id,
          name,
          email,
          birthdate,
          gender,
          identityCard,
          isActive,
          last_name,
          phone,
          role
        } = jwt.decode(data.token) as JWTPayload;

        return {
          id,
          name,
          email,
          birthdate,
          gender,
          identityCard,
          isActive,
          last_name,
          phone,
          role,
          token: data.token
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.data as User;

      return session;
    }
  }
};

export const { signIn, signOut } = NextAuth(authOptions);
