"use client";

import { useMemo } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Slider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
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

    const qualificationsTableTypes = useMemo(() => ({
        "score": ["tubusta", "carpentiere", "impiegato", "capo_tecnico", "manovale"],
        "type_material_score": ["saldatore"]
    }), []);

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

    const qualificationsCard = useMemo(() => (
        employee ? (
            <Card>
                <CardHeader className="flex justify-between">
                    <h2 className="text-lg font-medium">{text.employeePage.qualifications}</h2>
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
                    { employee.qualifications && Object.keys(employee.qualifications).filter(value => qualificationsTableTypes["score"].includes(value)).length > 0 ? (
                        <Table removeWrapper>
                            <TableHeader>
                                <TableColumn align="center">{text.employeePage.qualifications}</TableColumn>
                                <TableColumn align="center">{text.employeePage.score}</TableColumn>
                                <TableColumn align="center">
                                    {mode === "view" ? null: "Actions"}
                                </TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"Empty"}>
                                {Object.keys(employee.qualifications).filter(value => qualificationsTableTypes["score"].includes(value)).map((qualification) => (
                                    <TableRow key={qualification}>
                                        <TableCell>{qualification}</TableCell>
                                        <TableCell>{employee.qualifications && Array.isArray(employee.qualifications[qualification]) ? employee.qualifications[qualification][0].score.toString() : null}</TableCell>
                                        <TableCell>
                                            {mode === "view" ? null: (
                                                <div className="flex items-center justify-center gap-4">
                                                    <Tooltip content="Edit Qualification">
                                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                            <EditIcon />
                                                        </span>
                                                    </Tooltip>
                                                    <Tooltip color="danger" content="Delete Qualification">
                                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <DeleteIcon />
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : null}
                </CardBody>
            </Card>
        ) : null
    ), [mode, onOpen, text, employee, qualificationsTableTypes]);

    return (
        <>
            {qualificationsCard}
            {qualificationsModal}
        </>
    );
}