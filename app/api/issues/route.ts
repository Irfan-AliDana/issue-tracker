import { IssueSchema } from "@/lib/schemaValidations";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
    try {
        const issues = await prisma.issue.findMany({
            select: { id: true, title: true, createdAt: true, status: true },
        });

        return NextResponse.json(issues);
    } catch (error) {
        throw new Error("Failed to fetch issues!");
    }
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = IssueSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const issue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            userId: 1,
        },
    });

    return NextResponse.json(issue, { status: 201 });
}
