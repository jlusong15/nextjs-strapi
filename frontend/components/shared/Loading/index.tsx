import { Spinner } from "@/components/ui/spinner"

interface LoadingProps {
	text?: string
}

export default function Loading({ text }: LoadingProps) {
	return (
		<div className="flex flex-row gap-1 items-center">
			<Spinner className="text-primary"/> <em className="text-gray-600">{text}</em>
		</div>
	)
}
