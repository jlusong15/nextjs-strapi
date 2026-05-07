"use client"

import { Bold, Heading1, Italic, List, ListOrdered, Redo, Underline as UnderlineIcon, Undo } from "lucide-react"

export default function TipTapToolbar({ editor }: { editor: any }) {
	if (!editor) return null

	const btnClass = (active?: boolean) =>
		`cursor-pointer p-2 rounded-md hover:bg-gray-100 transition ${active ? "bg-gray-100 text-indigo-600" : "text-gray-700"}`

	return (
		<div className="flex flex-wrap items-center gap-1 border-b p-2 bg-white">
			<button onClick={() => editor.chain().focus().undo().run()} className={btnClass()} title="Undo (Ctrl+Z)">
				<Undo size={16} />
			</button>

			<button onClick={() => editor.chain().focus().redo().run()} className={btnClass()} title="Redo (Ctrl+Y)">
				<Redo size={16} />
			</button>

			<div className="w-px h-5 bg-gray-200 mx-1" />

			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={btnClass(editor.isActive("bold"))}
				title="Bold (Ctrl+B)"
			>
				<Bold size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={btnClass(editor.isActive("italic"))}
				title="Italic (Ctrl+I)"
			>
				<Italic size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={btnClass(editor.isActive("underline"))}
				title="Underline"
			>
				<UnderlineIcon size={16} />
			</button>

			{/* <div className="w-px h-5 bg-gray-200 mx-1" />

			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={btnClass(editor.isActive("heading", { level: 1 }))}
			>
				<Heading1 size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={btnClass(editor.isActive("bulletList"))}
			>
				<List size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={btnClass(editor.isActive("orderedList"))}
			>
				<ListOrdered size={16} />
			</button>

			<div className="w-px h-5 bg-gray-200 mx-1" />

			 <button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={btnClass(editor.isActive("blockquote"))}
			>
				<Quote size={16} />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={btnClass(editor.isActive("codeBlock"))}
			>
				<Code size={16} />
			</button>

			<button
				onClick={() => {
					const url = window.prompt("Enter URL")
					if (url) {
						editor.chain().focus().setLink({ href: url }).run()
					}
				}}
				className={btnClass(editor.isActive("link"))}
			>
				<LinkIcon size={16} />
			</button> */}
		</div>
	)
}
