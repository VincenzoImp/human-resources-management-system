"use client";

import { useEmployees, useEmployeeColumns } from "../context";
import type { Employee } from "../context";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import { ChevronDownIcon, PlusIcon, SearchIcon } from "../icons";
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useCallback, useMemo, useState } from "react";
import { ColumnElement } from "@react-types/table";

export default function Employees() {
	const employeeColumns = useEmployeeColumns();
    const { employees } = useEmployees();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
	const [searchValue, setsearchValue] = useState("");
    const [employedValue, setemployedValue] = useState<boolean | null>(null);

	const filteredItems = useMemo(() => {
        let filteredEmployees = employees ? employees : Array<Employee>();
		if (searchValue) {
            filteredEmployees = filteredEmployees.filter((employee) => {
                for (const word of searchValue.split(" ")) {
                    if (employee.name.toLowerCase().includes(word.toLowerCase()) || employee.surname.toLowerCase().includes(word.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
		}
		if (employedValue !== null) {
			filteredEmployees = filteredEmployees.filter((employee) => employee.employed === employedValue);
		}
		return filteredEmployees;
	}, [employees, searchValue, employedValue]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const onNextPage = useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(1);
	}, []);

	const onSearchChange = useCallback((value: string) => {
		if (value) {
			setsearchValue(value);
			setPage(1);
		} else {
			setsearchValue("");
		}
	}, []);

	const onClear = useCallback(() => {
		setsearchValue("");
		setPage(1);
	}, []);

	const onEmployedChange = useCallback((value: boolean | null) => {
		setemployedValue(value);
		setPage(1);
	}, []);

	const topContent = useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%]"
						placeholder="Search by name..."
						startContent={<SearchIcon />}
						value={searchValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<Dropdown>
						<DropdownTrigger>
							<Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
								Employed
							</Button>
						</DropdownTrigger>
						<DropdownMenu>
							<DropdownItem onClick={() => onEmployedChange(null)}>All</DropdownItem>
							<DropdownItem onClick={() => onEmployedChange(true)}>Employed</DropdownItem>
							<DropdownItem onClick={() => onEmployedChange(false)}>Unemployed</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button color="primary" endContent={<PlusIcon />}>
						Add New
					</Button>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">Total {employees ? employees.length : 0} employees</span>
					<label className="flex items-center text-default-400 text-small">
						Rows per page:
						<select
							className="bg-transparent outline-none text-default-400 text-small"
							onChange={onRowsPerPageChange}
						>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="15">15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [searchValue, employedValue, onRowsPerPageChange, employees]);

	const bottomContent = useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{filteredItems.length === 0 ? "No employees found" : ""}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
						Previous
					</Button>
					<Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [filteredItems.length, page, pages]);

	return (
		<Table
			aria-label="Employees"
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			classNames={{
				wrapper: "max-h-[382px]",
			}}
			topContent={topContent}
			topContentPlacement="outside"
		>
			<TableHeader columns={employeeColumns.employeeColumns.map((column) => column.field)}>
				{employeeColumns.employeeColumns.map((column: { field: Key | null | undefined; headerName: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | ColumnElement<unknown> | null | undefined; }) => (
					<TableColumn
						key={column.field}
						align="start"
						allowsSorting={false}
					>
						{column.headerName} {/* Render the header name */}
					</TableColumn>
				))}
			</TableHeader>
			<TableBody emptyContent={"No employees found"} items={items}>
				{filteredItems.map((employee) => (
					<TableRow key={employee.id}>
						{employeeColumns.employeeColumns.map((column: { field: Key }) => (
							<TableCell key={column.field}>
								az
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}