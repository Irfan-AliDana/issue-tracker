import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    description: z
        .string()
        .min(1, {
            message: "Description must be at least 1 characters.",
        })
        .max(500),
});
