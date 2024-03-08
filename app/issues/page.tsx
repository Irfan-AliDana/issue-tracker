"use client";

import { DataTable } from "./data-table";

import { columns } from "./columns";
import axios from "axios";
import { Issue } from "@prisma/client";
import { useEffect, useState } from "react";
import DialogBox from "./DialogBox";

const columnStatus: Record<string, string> = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    CLOSED: "Closed",
};

const IssuesPage = () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const [showDialog, setShowDialog] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<Issue>({
        id: 0,
        createdAt: new Date(),
        description: "",
        status: "",
    });
    const [issues, setIssues] = useState<Issue[]>();

    const mappedData = issues?.map((tableData: Issue) => ({
        id: tableData.id,
        title: tableData.title,
        created: new Date(tableData.createdAt).toDateString(),
        status: columnStatus[tableData.status],
    }));

    const handleCellClick = (rowData: Issue) => {
        setSelectedRowData(rowData);
        setShowDialog(true);
    };

    useEffect(() => {
        const getIssues = async () => {
            const response = await axios.get(
                "http://localhost:3000/api/issues"
            );

            if (!response.data) {
                throw new Error("Something went wrong");
            }

            setIssues(response.data);
        };

        getIssues();
    }, []);

    return (
        <div className="container mx-auto py-10">
            {issues?.length && (
                <DataTable
                    columns={columns}
                    data={mappedData}
                    handleCellClick={handleCellClick}
                />
            )}
            <DialogBox
                issue={selectedRowData}
                showDialog={showDialog}
                setShowDialog={setShowDialog}
            />
        </div>
    );
};

export default IssuesPage;
