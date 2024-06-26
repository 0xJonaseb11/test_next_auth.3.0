import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";



export const authOptions: AuthOptions ={

    providers:[
        GoogleProvider({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            httpOptions:{
                 timeout:15000
            }
        }
             
        )
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXT_AUTH_KEY,
    debug: true
}