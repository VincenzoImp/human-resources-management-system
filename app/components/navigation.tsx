"use client";

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useState } from "react";
import { useText, useUser } from "@/app/context";
import { handleLogout } from "@/app/autenticazione/authentication";

export default function Navigation({ itemActive }: Readonly<{ itemActive: string }>) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const text = useText();
	const menuItems = {
		home: text.navigation.home,
		risorse: text.navigation.employees,
		qualifiche: text.navigation.qualifications
	};
	const { user, setUser } = useUser();
	return (
		<Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="sm:hidden" justify="start">
				<NavbarMenuToggle aria-label={text.navigation.toggleMenu} />
			</NavbarContent>
			<NavbarContent justify="center" className="sm:flex-1">
				<NavbarBrand>
					<p className="font-bold text-inherit">{text.other.iwn}</p>
				</NavbarBrand>
			</NavbarContent>  
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{Object.entries(menuItems).map(([key, value], index) => (
					<NavbarItem key={`${key}-${index}`} isActive={itemActive === key}>
						<Link
							color={itemActive === key ? "primary" : "foreground"}
							href={`/${key}`}
							aria-current={itemActive === key ? "page" : undefined}
							aria-label={value}
						>
							{value}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent as="div" justify="end">
				<Dropdown placement="bottom-end">
					<DropdownTrigger aria-label={text.authentication.accountMenu}>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							size="sm"
							showFallback
							aria-label={text.authentication.avatar}
						/>
					</DropdownTrigger>
					<DropdownMenu variant="flat">
						<DropdownItem key={text.authentication.profile} className="h-14 gap-2" aria-label={text.authentication.profile}>
							<p className="font-semibold">{text.authentication.loggedInAs}</p>
							<p className="font-semibold">{user?.email}</p>
						</DropdownItem>
						<DropdownItem key={text.authentication.logoutButton} color="danger" onPress={() => handleLogout(text.authentication.logoutSuccess, setUser)} aria-label={text.authentication.logoutButton}>
							{text.authentication.logoutButton}
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</NavbarContent>
			<NavbarMenu>
				{Object.entries(menuItems).map(([key, value], index) => (
					<NavbarMenuItem key={`${key}-${index}`}>
						<Link
							className="w-full"
							color={itemActive === key ? "primary" : "foreground"}
							href={`/${key.toLowerCase()}`}
							size="lg"
							aria-label={value}
						>
							{value}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
