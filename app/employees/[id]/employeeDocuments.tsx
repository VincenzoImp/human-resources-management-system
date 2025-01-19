"use client";

import { JSX, use, useCallback, useMemo, useState } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, PlusIcon } from "@/app/icons";

export default function EmployeeDocuments() {

    const { employee, setEmployee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    const {isOpen, onOpenChange} = useDisclosure();

    const addDocument = useCallback((document: string) => {
        // TODO: Add document to employee
    }, [employee])
    
    const deleteDocument = useCallback((document: string) => {
        // TODO: Delete document from employee
    }, [employee])

    const actions = useCallback((document: string): JSX.Element => {
        return (
            <div className="flex items-center justify-center gap-4">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon onClick={() => deleteDocument(document)} />
                </span>
            </div>
        )
    }, [deleteDocument])

    const documentsModal = useMemo(() => (
        <div className="container mx-auto">
            <h1>Modal</h1>
        </div>
    ), [])

    const table = useMemo(() => {
        const _documents = Array.isArray(employee?.documents) ? employee.documents : [];
        if (_documents.length === 0) return null;
        const _columns = mode === "view" ? ["document"] : ["document", "actions"];
        let _row: Record<string, string | JSX.Element>[] = [];
        _documents.forEach((document: string) => {
            if (mode === "view") {
                _row.push({ document: document })
            } else {
                _row.push({ document: document, actions: actions(document) })
            }
        })

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
                {_row.map((row, index) => (
                    <TableRow key={index}>
                        {Object.keys(row).map((key) => (
                            <TableCell key={key} align="center">
                                {row[key]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        )
        return (
            <Table>
                {header}
                {body}
            </Table>
        )
    }, [employee, text, mode])

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