import { ReactNode } from "react"
import PageHeader from "../../shared/PageHeader"

interface SubPageLayoutProps {
	title: string
	children: ReactNode
}

export default function SubPageLayout({ title, children }: SubPageLayoutProps) {
	return (
		<div className="p-5">
			<PageHeader title={title} />
			<div>{children}</div>
		</div>
	)
}
