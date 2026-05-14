import { BookA, House, LucideIcon, Radio } from "lucide-react";

export interface NavModel {
	name: string
	route: string
	icon: LucideIcon
}

export const NavLinks = [
	{ name: 'Home', icon: House, route: '/' },
	{ name: 'Books', icon: BookA, route: '/book-reviews' },
	{ name: 'Stream', icon: Radio, route: '/stream' },
];
