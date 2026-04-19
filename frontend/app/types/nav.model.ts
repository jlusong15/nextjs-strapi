import { BookA, House, LayoutDashboard, LucideIcon, Mail, SquareCheckBig } from "lucide-react";

export interface NavModel {
  name: string
  route: string
  icon: LucideIcon
}

export const NavLinks = [
  { name: 'Home', icon: House, route: '/' },
  { name: 'Book', icon: BookA, route: '/book-review' },
  // { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  // { name: 'Tasks', icon: SquareCheckBig, route: '/tasks' },
  // { name: 'Contact', icon: Mail, route: '/contact' },
];
