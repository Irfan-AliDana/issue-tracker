"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TbEdit, TbTrash } from "react-icons/tb";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type IssueType = {
    id: number;
    title: string;
    created: string;
    status: string;
};

export const columns: ColumnDef<IssueType>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            const badgeColor: Record<string, string> = {
                Open: "bg-red-600",
                "In Progress": "bg-blue-600",
                Closed: "bg-green-600",
            };

            return <Badge className={badgeColor[status]}>{status}</Badge>;
        },
    },
    {
        accessorKey: "created",
        header: "Created",
    },
    {
        id: "actions",
        header: () => (
            <Link href={"/issues/create"}>
                <Button size={"sm"}>Add Issue</Button>
            </Link>
        ),
        cell: ({ row }) => {
            const issue = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert("hello world!")}>
                            <TbEdit className="w-[20px] h-[20px] mr-2" />
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => alert("Deleted! Not actually ;)")}
                        >
                            <TbTrash className="w-[20px] h-[20px] mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
