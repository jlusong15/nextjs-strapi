"use client"

import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TipTapToolbar from "./TipTapToolBar"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"

type TipTapEditorProps = {
	value?: any
	onChange: (value: any) => void
}

export default function TipTapEditor({ value, onChange, ...props }: TipTapEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({
				openOnClick: false,
			}),
			Placeholder.configure({
				placeholder: "Write something...",
			}),
		],
		editorProps: {
			attributes: {
				class: "tiptap min-h-[200px] p-3 outline-none focus:outline-none",
			},
		},
		immediatelyRender: false,
		content: value || "",
		onUpdate({ editor }) {
			onChange(editor.getJSON())
		},
	})

	// useEffect(() => {
	// 	if (editor) {
	// 		onChange(editor.getJSON())
	// 	}
	// }, [editor])

	return (
		<div className="border rounded-lg overflow-hidden">
			<TipTapToolbar editor={editor} /> <EditorContent editor={editor} {...props} />
		</div>
	)
}
