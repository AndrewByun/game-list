import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from './app/lib/definitions';
import bcrypt from 'bcrypt';
import { default as db } from './app/lib/db';


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  //we pass in authConfig here to access its callbacks, which are ran everytime we make a request to one of its protected routes
  ...authConfig,
  providers: [
    Credentials({
      //this function handles the sign in logic, we use zod to validate the email and password before checking if the user exists in the database
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        //if the credentials are valid, 
        if (parsedCredentials.success) {
          //using destructuring, create variables labeled email and password and assign them to the 
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
