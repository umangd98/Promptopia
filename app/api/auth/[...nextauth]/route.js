import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }),
    ], 
    callbacks: {
        // aysnc session({session}){
        //     return session
        // },
        async signIn({profile}){
            try {
                //serverless -> Lambda -> dynamoDB
                await connectToDB()

                //check if user exists in db
                const userExists = await User.findOne({email: profile.email})
                //if not, create user in db
                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(), 
                        image: profile.picture,
                    })
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        async session({ session, token, user }) {
          
           const sessionUser = await User.findOne({email: session.user.email})
           session.user.id = sessionUser._id
           return session
          },
        }
})

export { handler as GET, handler as POST}