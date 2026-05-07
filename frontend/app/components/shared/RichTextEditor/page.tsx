"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"

type Props = {
	onChange: (value: any) => void
}

export default function RichTextEditor({ onChange, ...props }: Props) {
	const editor = useEditor({
		extensions: [StarterKit],
		immediatelyRender: false,
		content: "",
		onUpdate({ editor }) {
			onChange(editor.getJSON())
		},
	})

	useEffect(() => {
		if (editor) {
			onChange(editor.getJSON())
		}
	}, [editor])

	return (
		<div className="border rounded p-2 min-h-37.5">
			<EditorContent editor={editor} {...props}/>
		</div>
	)
}
