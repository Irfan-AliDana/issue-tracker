"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IssueType } from "./columns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeletion = ({ columns }: { columns: ColumnDef<IssueType>[] }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={column.id}>
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <TableRow key={item}>
                            <TableCell>
                                <Skeleton className="h-4 w-[250px] bg-gray-200" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[250px] bg-gray-200" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[250px] bg-gray-200" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableSkeletion;
