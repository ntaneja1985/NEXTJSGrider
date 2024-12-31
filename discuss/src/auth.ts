import NextAuth from "next-auth";
import GitHub from 'next-auth/providers/github';
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from '@/db';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('Missing github oauth credentials');
}

//Here GET, POST are used by Github and auth object determines whether our user is signed in or not.
export const {handlers:{GET,POST},auth,signOut,signIn}= NextAuth({
 adapter: PrismaAdapter(db),
 providers: [
     GitHub({
         clientId: GITHUB_CLIENT_ID,
         clientSecret: GITHUB_CLIENT_SECRET,
     })
 ],
 callbacks:{
     //Usually not needed, here we are fixing a bug in NextAuth
     async session({session,user}){
         if(session && user && session.user){
             //Bug is that the user property of session object doesnot get the id property assigned to them, so we need to assign it here manually
             session.user.id = user.id
         }
         return session;
     }
 }
})