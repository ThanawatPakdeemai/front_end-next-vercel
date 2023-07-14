import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import TwitterProvider from "next-auth/providers/twitter"
import FacebookProvider from "next-auth/providers/facebook"
import { ISessionCallBack } from "@src/types/nextauth"

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_ID,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_SECRET
      // version: "2.0" // opt-in to Twitter OAuth 2.0
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET
    })
  ],
  callbacks: {
    session: async (session: ISessionCallBack) => {
      if (session.session.user) {
        session.session.user.id = session.token.sub
      }
      return Promise.resolve(session.session)
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}
export default NextAuth(authOptions)
