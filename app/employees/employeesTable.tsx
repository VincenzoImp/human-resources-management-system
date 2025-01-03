"use client";

import { useText } from "@/app/context";
import type { Employee } from "@/app/context";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination, Spinner, Card } from "@nextui-org/react";
import { SearchIcon } from "@/app/icons";
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { readEmployees } from "@/app/api";
import { toast } from "@/app/components/toast";

export default function EmployeesTable() {

	const [employees, setEmployees] = useState<Employee[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function fetchEmployees() {
			try {
				const employeesData = await readEmployees();
				setEmployees(employeesData);
			} catch (error: unknown) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
			}
			setIsLoading(false);
		}
		fetchEmployees();
	}, [setEmployees, setIsLoading]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [employedValue, setEmployedValue] = useState<string>("all");
	const text = useText();
	const visibleCloumns = useMemo(() => ["name", "surname", "phone", "email", "gender", "taxCode", "employed"], []);
	
	const filteredItems = useMemo(() => {
        let filteredEmployees = [...employees];
		if (searchValue.trim() !== "") {
            filteredEmployees = filteredEmployees.filter((employee) => {
                for (const word of searchValue.split(" ")) {
					if (word === "") {
						continue;
					}
					if ((employee.name && employee.name.toLowerCase().includes(word.toLowerCase())) || (employee.surname && employee.surname.toLowerCase().includes(word.toLowerCase()))) {
                        return true;
                    }
                }
                return false;
            });
		}
		if (employedValue !== "all") {
			filteredEmployees = filteredEmployees.filter((employee) => {
				return employee.employed !== null && employee.employed.toString() === employedValue;
			});
		}
		return filteredEmployees;
	}, [employees, searchValue, employedValue]);

	const pages = useMemo(() =>	{
		return Math.ceil(filteredItems.length / rowsPerPage);
	}, [filteredItems, rowsPerPage]);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value: string) => {
		if (value) {
			setSearchValue(value);
		} else {
			setSearchValue("");
		}
		setPage(1);
	}, []);

	const onClear = useCallback(() => {
		setSearchValue("");
		setPage(1);
	}, []);

	const onEmployedChange = useCallback((value: Key) => {
		setEmployedValue(value as string);
		setPage(1);
	}, []);

	const renderCell = useCallback((employee: Employee, column: string) => {
		if (column === "employed") {
			const value = employee[column as keyof Employee]?.toString();
			return value ? text.other[value] : "";
		}
		if (column === "gender") {
			const value = employee[column as keyof Employee]?.toString();
			return value ? text.other[value] : "";
		}
		return employee[column as keyof Employee]?.toString();
	}, [text]);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full"
						placeholder={text.employeesTable.searchPlaceholder}
						startContent={<SearchIcon />}
						value={searchValue}
						onClear={onClear}
						onValueChange={onSearchChange}
					/>
					<Dropdown>
						<DropdownTrigger>
							<Button variant="flat">
								{text.employeesTable.filter}
							</Button>
						</DropdownTrigger>
						<DropdownMenu 
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							onAction={(key) => onEmployedChange(key)}
							selectedKeys={[employedValue]}
						>
							<DropdownItem key="all">{text.other.all}</DropdownItem>
							<DropdownItem key="yes">{text.other.employeds}</DropdownItem>
							<DropdownItem key="no">{text.other.unemployeds}</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button color="primary" onClick={() => window.location.href = "/employees/add-new"}>
						{text.employeesTable.addNew}
					</Button>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">{text.employeesTable.totalEmployees}: {!isLoading ? filteredItems.length : null}</span>
					<label className="flex items-center text-default-400 text-small">
						{text.employeesTable.rowsPerPage}:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [searchValue, onSearchChange, onClear, onRowsPerPageChange, employedValue, onEmployedChange, filteredItems, text, isLoading]);

	const tableColumns = useMemo(() => {
		return visibleCloumns.map((column : string) => (
			<TableColumn key={column} align="center">
				{text.employeeAttributes[column]}
			</TableColumn>
		));
	}, [visibleCloumns, text]);

	const tableRows = useMemo(() => {
		return items.map((employee : Employee) => (
			<TableRow key={employee.id} className="cursor-pointer hover:bg-default-100" href={`/employees/${employee.id}`}>
				{visibleCloumns.map((column : string) => (
					<TableCell key={column}>
						{renderCell(employee, column)}
					</TableCell>
				))}
			</TableRow>
		));
	}, [visibleCloumns, items, renderCell]);

	const bottomContent = useMemo(() => {
		if (pages > 1) {
			return (
				<div className="flex w-full justify-center">
					<Pagination 
						isCompact
						showControls
						showShadow
						page={page}
						total={pages}
						onChange={setPage}
					/>
				</div>
			);
		}
		return null;
	}, [page, pages]);

	return (
		<Card className="container mx-auto">
			<Table 
				className="p-4"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				topContent={topContent}
				topContentPlacement="outside"
			>
				<TableHeader>
					{tableColumns}
				</TableHeader>
				<TableBody items={items} isLoading={isLoading} loadingContent={<Spinner />} >
					{tableRows}
				</TableBody>
			</Table>
		</Card>
	);
}