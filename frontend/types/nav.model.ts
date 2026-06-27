import { BookA, House, LayoutDashboard, LucideIcon, Radio } from "lucide-react";

export interface NavModel {
	name: string
	route: string
	icon: LucideIcon
}

export const NavLinks = [
	{ name: 'Home', icon: House, route: '/' },
	{ name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
	{ name: 'Books', icon: BookA, route: '/book-reviews' },
	{ name: 'Stream', icon: Radio, route: '/stream' },
];