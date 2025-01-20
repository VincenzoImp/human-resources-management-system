"use client";

import { JSX, useCallback, useMemo, useState } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, NewWindowIcon, PlusIcon } from "@/app/icons";
import { toast } from "@/app/components/toast";
import { getDocumentUrl, uploadDocument } from "@/app/api";

export default function EmployeeDocuments() {

    const { employee, setEmployee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    const {isOpen, onOpenChange} = useDisclosure();
    const [newDocument, setNewDocument] = useState<string | null>(null);
    const [newDocumentUploading, setNewDocumentUploading] = useState<boolean>(false);

    const addDocument = useCallback((document: string) => {
        if (employee) {
            if (employee.documents && !employee.documents.includes(document)) {
                setEmployee({
                    ...employee,
                    documents: [...employee.documents, document]
                })
            }
        }
    }, [employee, setEmployee])
    
    const deleteDocument = useCallback((document: string) => {
        if (employee) {
            if (employee.documents && employee.documents.includes(document)) {
                setEmployee({
                    ...employee,
                    documents: employee.documents.filter((doc) => doc !== document)
                })
            }
        }
    }, [employee, setEmployee])

    const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && employee && employee?.id) {
            setNewDocumentUploading(true);
            try {
                const filename = await uploadDocument(employee.id, file);
                setNewDocument(filename);
            } catch (error) {
                toast.error(error);
            }
            setNewDocumentUploading(false);
        }
    }, [employee, setNewDocument, setNewDocumentUploading])

    const actions = useCallback((document: string): JSX.Element => {
        return (
            <div className="flex items-center justify-center gap-4">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <NewWindowIcon onClick={async () => {
                        if (employee && employee?.id) {
                            try {
                                const url = await getDocumentUrl(employee.id, document);
                                window.open(url);
                            } catch (error) {
                                toast.error(error);
                            }
                        }
                    }} />
                </span>
                {mode === "view" ? null : (
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon onClick={() => deleteDocument(document)} />
                    </span>
                )}
            </div>
        )
    }, [deleteDocument, mode, employee])

    const documentsModal = useMemo(() => {
        return (
            <Modal isOpen={isOpen} onOpenChange={() => { onOpenChange(); setNewDocument(null); }}>
                <ModalContent>
                    <ModalHeader>
                        {text.employeeDocuments.addDocument}
                    </ModalHeader>
                    <ModalBody>
                        <Input type="file" onChange={(e) => handleInputChange(e)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" onPress={() => { onOpenChange(); setNewDocument(null); }}>
                            {text.employeeDocuments.cancel}
                        </Button>
                        <Button color="primary" isDisabled={newDocument === null || newDocumentUploading} isLoading={newDocumentUploading}
                            onPress={() => {
                                if (newDocument) {
                                    addDocument(newDocument);
                                    setNewDocument(null);
                                    onOpenChange();
                                }
                            }}
                        >
                            {newDocumentUploading ? null : text.employeeDocuments.add}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }, [isOpen, onOpenChange, addDocument, newDocument, newDocumentUploading, handleInputChange, text])

    const table = useMemo(() => {
        const _documents = Array.isArray(employee?.documents) ? employee.documents : [];
        if (_documents.length === 0) return null;
        const _columns = ["document", "actions"];
        const _row: { document: string, actions: JSX.Element }[] = _documents.map((document) => ({
            document,
            actions: actions(document)
        }))

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
                                {key === "document" ? (
                                    row[key as keyof typeof row].toString().split("_").slice(1).join("_")
                                ) : (
                                    row[key as keyof typeof row]
                                )}
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
    }, [employee, text, actions])

    const documentsCard = useMemo(() => (
        employee && mode ? (
            <div className="container mx-auto">
                <Card className="mx-2">
                    <CardHeader className="flex justify-between">
                        <h2 className="text-lg font-medium">{text.employeeDocuments.documents}</h2>
                        {mode === "view" ? null : (
                            <Chip variant="light" className="inline-block" endContent={
                                <Button size="sm" isIconOnly color="default" onPress={() => onOpenChange()}>
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
    ), [employee, mode, text, table, onOpenChange])

    return (
        <>
            {documentsCard}
            {documentsModal}
        </>
    )
}