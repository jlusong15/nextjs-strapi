import Link, { type LinkProps } from "next/link"
import { cn } from "@/lib/utils"

type Props = {
	href: LinkProps["href"]
	className?: string
	children: React.ReactNode
}

export default function LinkButton({ href, children, className, ...props }: Props & Omit<LinkProps, "href">) {
	if (!href) {
		return ""
	}
	return (
		<Link
			{...props}
			href={href}
			className={cn(
				"inline-flex items-center uppercase px-3 py-1.5 no-underline! rounded bg-primary transition text-white hover:bg-gray-600",
				className,
			)}
		>
			{children}
		</Link>
	)
}
