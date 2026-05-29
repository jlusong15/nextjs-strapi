import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

type FileInputProps = Omit<React.ComponentPropsWithoutRef<"input">, "type"> & {
	className?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ className, ...props }, ref) => {
	return (
		<Input
			ref={ref}
			type="file"
			className={cn(
				"h-10 w-full min-w-0 rounded border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none file:mr-2 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:font-medium file:hover:bg-primary/80 file:hover:cursor-pointer file:text-primary-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	)
})

FileInput.displayName = "FileInput"

export { FileInput }
