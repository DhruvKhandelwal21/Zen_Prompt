import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/db";
import Users from "@models/users";
export default NextAuth ({
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({session}: any){
      try{
       const currentUser: any = await Users.findOne({email:session.user.email});
       console.log(currentUser)
       session.user.id = currentUser._id.toString();
       return session;
      }catch(error){
         console.log(error)
      }
    },
    async signIn({ profile }: any) {
      try {
        await connectToDb();
        const userExists = await Users.findOne({ email: profile.email });
        if (!userExists) {
          await Users.create({
            email: profile?.email,
            userName: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.picture,
          });
        }
        return true
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

