import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import { ISessionCallBaqck } from "@src/types/nextauth"

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
    })
  ],
  callbacks: {
    session: async (session: ISessionCallBaqck) => {
      if (session.session.user) {
        session.session.user.id = session.token.sub
      }
      return Promise.resolve(session.session)
    }
  },
  secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt"
  }
}
export default NextAuth(authOptions)
