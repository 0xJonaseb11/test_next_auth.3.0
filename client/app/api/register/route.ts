import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "../schema";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma= new PrismaClient();
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request
        const validation = userSchema.validate(body);

        if (validation.error) {
            return NextResponse.json({ error: validation.error.message }, { status: 400 });
        }

        // Check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                hashedPassword: hashedPassword
            }
        });

        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}