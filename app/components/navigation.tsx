"use client";

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import { useUser } from "../context";
import { handleLogout } from "../authentication/authentication";

export default function Navigation({ itemActive }: Readonly<{ itemActive: string }>) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuItems = [
		"Home",
		"Employees",
		"Specializations"
	];
	const { user, setUser } = useUser();
	return (
		<Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>

			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
			</NavbarContent>

			<NavbarContent justify="center" className="sm:flex-1">
				<NavbarBrand>
					<p className="font-bold text-inherit">IWN</p>
				</NavbarBrand>
			</NavbarContent>  

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item, index) => (
					<NavbarItem key={`${item}-${index}`} isActive={itemActive === item}>
						<Link
							color={itemActive === item ? "primary" : "foreground"}
							href={`/${item.toLowerCase()}`}
							aria-current={itemActive === item ? "page" : undefined}
						>
							{item}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarContent as="div" justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							size="sm"
							showFallback
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">{user?.email}</p>
						</DropdownItem>
						<DropdownItem key="logout" color="danger" onClick={() => handleLogout(setUser)}>
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							className="w-full"
							color = { itemActive === item ? "primary" : "foreground" }
							href={`/${item.toLowerCase()}`}
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}

