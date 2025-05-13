import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.SERVER_BASE_URL}auth/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.tokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return { ...token, tokens: response };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'E-mail cím',
          type: 'email',
        },
        password: {
          label: 'Jelszó',
          type: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(`${process.env.SERVER_BASE_URL}auth/login`, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.status === 401) {
          console.error(res.statusText);
          return null;
        }
        return await res.json();
      },
    }),
  ],
  /*  pages: {
    signIn: '/auth/login',
  }, */
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.tokens.expiresIn) return token;
      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.tokens = token.tokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
