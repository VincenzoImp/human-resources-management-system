"use client";

import { useMemo, useState } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { PlusIcon } from "@/app/icons";

export default function EmployeeDocuments() {

    const { employee, setEmployee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    const [newDocument, setNewDocument] = useState<Set<string>>(new Set());
    const _columns = mode === "view" ? ["documents"] : ["documents", "actions"];
    const _rows = employee?.documents || [];

    const documentsModal = useMemo(() => (
        <div className="container mx-auto">
            <h1>Modal</h1>
        </div>
    ), [])

    const header = (
        <TableHeader>
            {_columns.map((column) => (
                <TableColumn key={column} align="center">
                    {text.employeeDocuments[column]}
                </TableColumn>
            ))}
        </TableHeader>
    )
    const body = (
        <TableBody>
            <TableRow>
                {_rows.map((row, index) => (
                        <TableRow key={index}>
                            {_columns.map((column) => (
                                <TableCell key={column} align="center">
                                    {column === "qualification" ? text.qualificationsList[row[column] as string] : row[column]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
            </TableRow>
        </TableBody>
    )

    const table = useMemo(() => (
        <Table>
            {header}
            {body}
        </Table>
    ), [header, body])

    const documentsCard = useMemo(() => (
        employee && mode ? (
            <div className="container mx-auto">
                <Card className="mx-2">
                    <CardHeader className="flex justify-between">
                        <h2 className="text-lg font-medium">{text.employeeDocuments.documents}</h2>
                        {mode === "view" ? null : (
                            <Chip variant="light" className="inline-block" endContent={
                                <Button size="sm" isIconOnly color="default" onPress={() => null}>
                                    <PlusIcon />
                                </Button>
                            }>
                            </Chip>
                        )}
                    </CardHeader>
                    <CardBody>
                        {employee.documents && employee.documents.length > 0 ? (
                            table
                        ) : (
                            <p className="text-default-400">{text.employeeDocuments.noDocuments}</p>
                        )}
                    </CardBody>
                </Card>
            </div>
        ) : null
    ), [employee, mode])

    return (
        <>
            {documentsCard}
            {documentsModal}
        </>
    )
}