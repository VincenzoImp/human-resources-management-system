"use client";

import { JSX, useCallback, useMemo } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, Spacer, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, EditIcon, PlusIcon } from "@/app/icons";

export default function EmployeeQualifications() {
  
    const { employee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // const handleInputChange = useCallback((field: keyof Employee, value: string | number | null | Record<string, Record<string, string>>) => {
    //     if (employee){
    //         setEmployee({ ...employee, [field]: value });
    //     }
    // }, [employee, setEmployee]);

    // TODO: Add Qualifications Modal
    const qualificationsModal = useMemo(() => (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add Qualification</ModalHeader>
                    <ModalBody>
                        <Input 
                            label={"Qualifications Name"}
                            value={""}                                        
                        />
                        <Input 
                            label={"Qualifications Specification"}
                            value={""}
                        />
                        <Slider 
                            label={"Qualifications Score"}
                            defaultValue={0}
                            maxValue={5}
                            step={0.5}
                            minValue={0}
                            showTooltip={true}
                            endContent={"5"}
                            startContent={"0"}
                            hideValue={true}
                            showSteps={true}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    ), [isOpen, onOpenChange]);

    // const addQualification = useCallback((qualification: string) => {
    //     console.log("Add Qualification", qualification);
    // }, []);

    const editQualification = useCallback((qualification: string, index: number) => {
        console.log("Edit Qualification", qualification, index);
    }, []);

    const deleteQualification = useCallback((qualification: string, index: number) => {
        console.log("Delete Qualification", qualification, index);
    }, []);

    const actions = useCallback((qualification: string, index: number) => (
        <div className="flex items-center justify-center gap-4">
            <Tooltip content="Edit Qualification">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon onClick={() => editQualification(qualification, index)} />
                </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Qualification">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon onClick={() => deleteQualification(qualification, index)} />
                </span>
            </Tooltip>
        </div>
    ), [editQualification, deleteQualification]);

    const renderTable = useCallback((columns: string[], qualifications: string[], mode: "view" | "edit" | "add") => {
        const _qualifications = Object.keys(employee?.qualifications || {}).filter(key => qualifications.includes(key));
        if (_qualifications.length === 0) return null;
        const _columns = ["qualification", ...columns, ...(mode !== "view" ? ["actions"] : [])];
        let _rows: Record<string, string | number | JSX.Element>[] = [];
        _qualifications.map((qualification) => {
            employee?.qualifications?.[qualification]?.map((item, index) => {
                _rows.push({ qualification, ...item, ...(mode !== "view" ? { actions: actions(qualification, index) } : {}) });
            });
        });
        // sort by qualification name and then by score in descending order
        _rows = _rows.sort((a, b) => {
            if (a.qualification < b.qualification) return -1;
            if (a.qualification > b.qualification) return 1;
            if (a.score < b.score) return 1;
            if (a.score > b.score) return -1;
            return 0;
        });
        const header = (
            <TableHeader>
                {_columns.map((column, index) => (
                    <TableColumn key={index} align="center">
                        {text.employeeQualifications[column]}
                    </TableColumn>
                ))}
            </TableHeader>
        )
        const body = (
            <TableBody>
                {_rows.map((row, index) => (
                    <TableRow key={index}>
                        {_columns.map((column) => (
                            <TableCell key={column} align="center">
                                {column === "qualification" ? text.qualificationsList[row[column] as string] : row[column]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        )
        return (
            <Table removeWrapper>
                {header}
                {body}
            </Table>
        );
    }, [employee, text, actions]);

    const qualificationsCard = useMemo(() => (
        employee && mode ? (
            <Card>
                <CardHeader className="flex justify-between">
                    <h2 className="text-lg font-medium">{text.employeeQualifications.qualifications}</h2>
                    {mode === "view" ? null : (
                        <Chip variant="light" className="inline-block" endContent={
                            <Button size="sm" isIconOnly color="default" onPress={onOpen}>
                                <PlusIcon />
                            </Button>
                        }>
                        </Chip>
                    )}
                </CardHeader>
                <CardBody>
                    {renderTable(["score"], ["tubista", "carpentiere", "impiegato", "capo_tecnico", "manovale"], mode)}
                    <Spacer y={4} />
                    {renderTable(["technique", "material", "score"], ["saldatore"], mode)}
                </CardBody>
            </Card>
        ) : null
    ), [mode, onOpen, text, employee, renderTable]);

    return (
        <>
            {qualificationsCard}
            {qualificationsModal}
        </>
    );
}