import { House, LayoutDashboard, LucideIcon, Mail, SquareCheckBig } from "lucide-react";

export interface NavModel {
  name: string
  route: string
  icon: LucideIcon,
  // current?: boolean
}

export const NavLinks = [
  { name: 'Home', icon: House, route: '/' },
  // { name: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  // { name: 'Tasks', icon: SquareCheckBig, route: '/tasks' },
  // { name: 'Contact', icon: Mail, route: '/contact' },
];
