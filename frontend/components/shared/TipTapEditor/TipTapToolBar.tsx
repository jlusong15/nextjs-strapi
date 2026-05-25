"use client"

import { Bold, Italic, Redo, Underline as UnderlineIcon, Undo } from "lucide-react"

type TipTapToolbarProps = {
	editor: any
	disabled?: boolean
}

export default function TipTapToolbar({ editor, disabled }: TipTapToolbarProps) {
	if (!editor) return null

	const btnClass = (active?: boolean) =>
		`p-2 rounded-md transition ${active ? "bg-gray-100 text-indigo-600" : "text-gray-700"} ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"}`

	return (
		<div className="flex flex-wrap items-center gap-1 border-b p-2 bg-white">
			<button onClick={() => editor.chain().focus().undo().run()} className={btnClass()} title="Undo (Ctrl+Z)" disabled={disabled}>
				<Undo size={16} />
			</button>

			<button onClick={() => editor.chain().focus().redo().run()} className={btnClass()} title="Redo (Ctrl+Y)" disabled={disabled}>
				<Redo size={16} />
			</button>

			<div className="w-px h-5 bg-gray-200 mx-1" />

			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={btnClass(editor.isActive("bold"))}
				title="Bold (Ctrl+B)"
				disabled={disabled}
			>
				<Bold size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={btnClass(editor.isActive("italic"))}
				title="Italic (Ctrl+I)"
				disabled={disabled}
			>
				<Italic size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={btnClass(editor.isActive("underline"))}
				title="Underline"
				disabled={disabled}
			>
				<UnderlineIcon size={16} />
			</button>
		</div>
	)
}
