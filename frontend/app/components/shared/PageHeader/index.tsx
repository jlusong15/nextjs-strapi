interface PageHeaderProps {
	title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
	return <h1 className="mb-3 font-semibold">{title}</h1>
}
