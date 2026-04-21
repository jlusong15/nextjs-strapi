import { BookA, House, LucideIcon } from "lucide-react";

export interface NavModel {
	name: string
	route: string
	icon: LucideIcon
}

export const NavLinks = [
	{ name: 'Home', icon: House, route: '/' },
	{ name: 'Book Reviews', icon: BookA, route: '/book-reviews' },
];
