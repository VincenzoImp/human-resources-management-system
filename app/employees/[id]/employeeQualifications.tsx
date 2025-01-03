"use client";

import { JSX, useCallback, useMemo, useState } from "react";
import { useText } from "@/app/context";
import { useEmployee, useMode } from "@/app/employees/[id]/context";
import { Button, Card, CardBody, CardHeader, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Slider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, EditIcon, PlusIcon } from "@/app/icons";

export default function EmployeeQualifications() {

    const { employee, setEmployee } = useEmployee();
    const { mode } = useMode();
    const text = useText();
    const {isOpen, onOpenChange} = useDisclosure();
    const [stage, setStage] = useState<"add1" | "add2" | "edit2" | null>(null);
    const [newQualification, setNewQualification] = useState<Record<string, string | number>>({});
    const utilsDict = useMemo(() => ({
        ["score"]: ["tubista", "carpentiere", "impiegato", "capoTecnico", "manovale"],
        ["technique_material_score"]: ["saldatore"]
    }), []);

    const addQualification = useCallback((qualification: string) => {
        const _newQualification = { ...newQualification };
        delete _newQualification.qualification;
        if (employee) {
            if (!employee.qualifications) {
                setEmployee({ ...employee, qualifications: { [qualification]: [_newQualification] } });
            } else if (!employee.qualifications[qualification]) {
                setEmployee({ ...employee, qualifications: { ...employee.qualifications, [qualification]: [_newQualification] } });
            } else if (employee.qualifications[qualification]) {
                setEmployee({ ...employee, qualifications: { ...employee.qualifications, [qualification]: [...employee.qualifications[qualification], _newQualification] } });
            }
        }
    }, [newQualification, setEmployee, employee]);

    const editQualification = useCallback((qualification: string, index: number) => {
        const _newQualification = { ...newQualification };
        delete _newQualification.qualification;
        if (employee) {
            if (!employee.qualifications) return;
            if (!employee.qualifications[qualification]) return;
            const _qualifications = employee.qualifications[qualification].map((item, i) => i === index ? _newQualification : item);
            setEmployee({ ...employee, qualifications: { ...employee.qualifications, [qualification]: _qualifications } });
        }
    }, [newQualification, setEmployee, employee]);

    const deleteQualification = useCallback((qualification: string, index: number) => {
        if (employee) {
            if (!employee.qualifications) return;
            if (!employee.qualifications[qualification]) return;
            const _qualifications = employee.qualifications[qualification].filter((_, i) => i !== index);
            if (_qualifications.length === 0) {
                const _employee = { ...employee };
                if (_employee.qualifications) {
                    delete _employee.qualifications[qualification];
                }
                setEmployee(_employee);
            } else {
                setEmployee({ ...employee, qualifications: { ...employee.qualifications, [qualification]: _qualifications } });
            }
        }
    }, [setEmployee, employee]);

    const actions = useCallback((qualification: string, index: number) => (
        <div className="flex items-center justify-center gap-4">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => { 
                    setStage("edit2"); 
                    setNewQualification({ qualification, ...employee?.qualifications?.[qualification]?.[index], index: index });
                    onOpenChange(); 
                    }}
                />
            </span>
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteQualification(qualification, index)} />
            </span>
        </div>
    ), [deleteQualification, onOpenChange, employee, setNewQualification]);

    const qualificationsModal = useMemo(() => {
        const _qualificationsList = Object.keys(text.qualificationsList).sort();
        const contentStage1 = (
            <>
                <ModalHeader className="flex flex-col gap-1">
                    {text.employeeQualifications.selectQualification}
                </ModalHeader>
                <ModalBody>
                    <RadioGroup>
                        {_qualificationsList.map((qualification, index) => (
                            <Radio 
                                key={index} 
                                value={qualification} 
                                onChange={(e) => {
                                    const key = Object.keys(utilsDict).find(key => utilsDict[key as keyof typeof utilsDict].includes(e.target.value as string));
                                    const columns = key?.split("_") || [];
                                    const defaultValues = columns.reduce((acc, column) => (column === "score" ? { ...acc, [column]: 0 } : { ...acc, [column]: "" }), {});
                                    setNewQualification({ qualification: e.target.value, ...defaultValues });
                                }}
                            >
                                {text.qualificationsList[qualification]}
                            </Radio>
                        ))}
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onPress={ () => { setStage("add1"); setNewQualification({}); onOpenChange(); }}>
                        {text.employeeQualifications.cancel}
                    </Button>
                    <Button color="primary" onPress={() => setStage("add2")} isDisabled={!newQualification.qualification}>
                        {text.employeeQualifications.next}
                    </Button>
                </ModalFooter>
            </>
        );
        const contentStage2 = () => {
            const body: JSX.Element[] = [];
            const key = Object.keys(utilsDict).find(key => utilsDict[key as keyof typeof utilsDict].includes(newQualification.qualification as string));
            const columns = key?.split("_") || [];
            columns.map((column, index) => {
                switch (column) {
                    case "qualification":
                        break;
                    case "index":
                        break;
                    case "score":
                        body.push(
                            <Slider 
                                key={index}
                                label={text.employeeQualifications[column]}
                                defaultValue={newQualification[column] as number}
                                maxValue={5}
                                step={0.5}
                                minValue={0}
                                showTooltip={true}
                                endContent={"5"}
                                startContent={"0"}
                                hideValue={true}
                                showSteps={true}
                                onChange={(value) => setNewQualification({ ...newQualification, [column]: Array.isArray(value) ? value[0] : value })}
                            />
                        );
                        break;
                    default:
                        body.push(
                            <Input 
                                key={index}
                                label={text.employeeQualifications[column]}
                                value={newQualification[column] as string}
                                onChange={(e) => setNewQualification({ ...newQualification, [column]: e.target.value })}
                            />
                        );
                        break;
                }
            });                
            return (
                <>
                    <ModalHeader className="flex flex-col gap-1">
                        {stage === "add2" ? text.employeeQualifications.addQualification : stage === "edit2" ? text.employeeQualifications.editQualification : null}: {text.qualificationsList[newQualification.qualification as string]}
                    </ModalHeader>
                    <ModalBody>
                        {body.map((element) => element)}
                    </ModalBody>
                    { stage === "add2" ? (   
                        <ModalFooter>
                            <Button color="secondary" onPress={() => { setStage("add1"); setNewQualification({}); }}>
                                {text.employeeQualifications.back}
                            </Button>
                            <Button 
                                color="primary" 
                                onPress={() => { 
                                    addQualification(newQualification.qualification as string);
                                    setStage(null); 
                                    setNewQualification({}); 
                                    onOpenChange();
                                }}
                            >
                                {text.employeeQualifications.add}
                            </Button>
                        </ModalFooter>
                    ) : stage === "edit2" ? (
                        <ModalFooter>
                            <Button 
                                color="primary" 
                                onPress={ () => {
                                    editQualification(newQualification.qualification as string, newQualification.index as number);
                                    setStage(null); 
                                    setNewQualification({}); 
                                    onOpenChange(); 
                                }}
                            >
                                {text.employeeQualifications.save}
                            </Button>
                        </ModalFooter>
                    ) : null }
                </>
            )
        };
        return (
            <Modal isOpen={isOpen} onOpenChange={() => { setStage("add1"); setNewQualification({}); onOpenChange(); }}>
                <ModalContent>
                    {stage === "add1" ? contentStage1 : contentStage2()}
                </ModalContent>
            </Modal>
        )
    }, [isOpen, onOpenChange, stage, text, newQualification, setNewQualification, utilsDict, addQualification, editQualification]);

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
            <Table>
                {header}
                {body}
            </Table>
        );
    }, [employee, text, actions]);
    
    const tables = useMemo(() => {
        return (
            employee && mode ? (
                <div className="flex flex-col gap-2">
                    {renderTable(["score"], ["tubista", "carpentiere", "impiegato", "capoTecnico", "manovale"], mode)}
                    {renderTable(["technique", "material", "score"], ["saldatore"], mode)}
                </div>
            ) : null
        );
    }, [mode, employee, renderTable]);

    const qualificationsCard = useMemo(() => (
            employee && mode ? (
                <div className="container mx-auto">
                    <Card className="mx-2">
                        <CardHeader className="flex justify-between">
                            <h2 className="text-lg font-medium">{text.employeeQualifications.qualifications}</h2>
                            {mode === "view" ? null : (
                                <Chip variant="light" className="inline-block" endContent={
                                    <Button size="sm" isIconOnly color="default" onPress={() => { setStage("add1"); onOpenChange(); }}>
                                        <PlusIcon />
                                    </Button>
                                }>
                                </Chip>
                            )}
                        </CardHeader>
                        <CardBody>
                            {employee.qualifications && Object.keys(employee.qualifications).length > 0 ? (
                                tables
                            ) : (
                                <p className="text-default-400">{text.employeeQualifications.noQualifications}</p>
                            )}
                        </CardBody>
                    </Card>
                </div>
            ) : null
        ), [employee, mode, text, tables, onOpenChange]);


    return (
        <>
            {qualificationsCard}
            {qualificationsModal}
        </>
    );
}