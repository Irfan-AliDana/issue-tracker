import { DataTable } from "./data-table";

import { columns } from "./columns";
import axios from "axios";
import { Issue } from "@prisma/client";

const columnStatus: Record<string, string> = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    CLOSED: "Closed",
};

const getIssues = async () => {
    const issues = await axios.get("http://localhost:3000/api/issues");

    if (!issues.data) {
        throw new Error("Something went wrong");
    }

    return issues.data;
};

const IssuesPage = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const issues = await getIssues();

    const mappedData = issues.map((tableData: Issue) => ({
        id: tableData.id,
        title: tableData.title,
        created: new Date(tableData.createdAt).toDateString(),
        status: columnStatus[tableData.status],
    }));

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={mappedData} />
        </div>
    );
};

export default IssuesPage;
