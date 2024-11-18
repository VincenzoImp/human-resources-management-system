"use client";

import { useEmployeeColumns, useEmployees } from "../context";
import type { Employee } from "../context";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination } from "@nextui-org/react";
import { SearchIcon } from "../icons";
import { Key, useCallback, useMemo, useState } from "react";

export default function EmployeesTable() {

	const employeeColumns = useEmployeeColumns();
    const employees = useEmployees();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [employedValue, setEmployedValue] = useState<string>("both");

	const visibleCloumns = useMemo(() => {
		const subset = ["name", "surname", "email", "phone", "employed", "gender", "n_mat", "n_pro"];
		return employeeColumns.filter((column) => subset.includes(column.field)).sort((a, b) => subset.indexOf(a.field) - subset.indexOf(b.field));
	}, [employeeColumns]);
		
	const filteredItems = useMemo(() => {
        let filteredEmployees = employees ? employees : Array<Employee>();
		if (searchValue) {
            filteredEmployees = filteredEmployees.filter((employee) => {
                for (const word of searchValue.split(" ")) {
					if (word === "") {
						continue;
					}
                    if (employee.name.toLowerCase().includes(word.toLowerCase()) || employee.surname.toLowerCase().includes(word.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
		}
		if (employedValue !== "both") {
			filteredEmployees = filteredEmployees.filter((employee) => {
				if (employedValue === "true") {
					return employee.employed;
				} else {
					return !employee.employed;
				}
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
		if (value === "true") {
			setEmployedValue("true");
		} else if (value === "false") {
			setEmployedValue("false");
		} else if (value === "both") {
			setEmployedValue("both");
		}
		setPage(1);
	}, []);

	const renderCell = useCallback((employee: Employee, column: { field: string, headerName: string }) => {
		if (column.field === "employed") {
			return employee[column.field] ? "yes" : "no";
		}
		return employee[column.field as keyof Employee]?.toString();
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full"
						placeholder="Search..."
						startContent={<SearchIcon />}
						value={searchValue}
						onClear={onClear}
						onValueChange={onSearchChange}
					/>
					<Dropdown>
						<DropdownTrigger>
							<Button variant="flat">
								Filter
							</Button>
						</DropdownTrigger>
						<DropdownMenu 
							aria-label="Employed options"
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							onAction={(key) => onEmployedChange(key)}
							selectedKeys={[employedValue]}
						>
							<DropdownItem key="both">All</DropdownItem>
							<DropdownItem key="true">Employed</DropdownItem>
							<DropdownItem key="false">Unemployed</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button color="primary" onClick={() => window.location.href = "/employees/add-new"}>
						Add New
					</Button>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">Total {filteredItems ? filteredItems.length : 0} employees</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
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
	}, [searchValue, onSearchChange, onClear, onRowsPerPageChange, employedValue, onEmployedChange, filteredItems]);

	const tableColumns = useMemo(() => {
		return visibleCloumns.map((column: { field: string, headerName: string }) => (
			<TableColumn key={column.field} align="center">
				{column.headerName}
			</TableColumn>
		));
	}, [visibleCloumns]);

	const tableRows = useMemo(() => {
		return items.map((employee : Employee) => (
			<TableRow key={employee.id} className="cursor-pointer hover:bg-default-100" href={`/employees/${employee.id}`}>
				{visibleCloumns.map((column : { field: string, headerName: string }) => (
					<TableCell key={column.field}>
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
		<>
			<Table
				className="container mx-auto my-8"
				aria-label="Employees"
				bottomContent={bottomContent}
				bottomContentPlacement="outside"
				topContent={topContent}
				topContentPlacement="outside"
			>
				<TableHeader columns={visibleCloumns.map((column) => column.headerName)}>
					{tableColumns}
				</TableHeader>
				<TableBody emptyContent={"\n"} items={items}>
					{tableRows}
				</TableBody>
			</Table>
		</>
	);
}