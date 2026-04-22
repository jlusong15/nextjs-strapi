interface PageHeaderProps {
	title: string
}

export default function PageHeader({ title }: PageHeaderProps) {
	return <h1 className="mb-3 font-semibold text-primary">{title}</h1>
}
