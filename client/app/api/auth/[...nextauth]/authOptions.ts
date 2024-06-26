import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from 'bcryptjs'
const prisma= new PrismaClient()
export const authOptions: AuthOptions ={

    providers:[
        GoogleProvider({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            clientId: process.env.GOOGLE_CLIENT_ID!,
            httpOptions:{
                 timeout:15000
            }
        }),
        Credentials(
            {
                name: "Credentials",
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "Email" },
                    password: { label: "Password", type: "password", placeholder: "Password" }
                    
                },
                async authorize(credentials, req) {
                    if ( !credentials?.email || !credentials.password) return null;
    
                    const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                    if (!user) return null;
    
                    const match = await bcrypt.compare(credentials.password, user.hashedPassword!);
                    if (match) return user;
                    else return null;
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