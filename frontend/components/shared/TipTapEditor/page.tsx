"use client"

import { useEffect } from "react"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TipTapToolbar from "./TipTapToolBar"

type TipTapEditorProps = {
	value?: any
	onChange: (value: any) => void
	hasError?: boolean
	disabled?: boolean
}

export default function TipTapEditor({ value, onChange, hasError, disabled = false, ...props }: TipTapEditorProps) {
  const error = hasError
	const editor = useEditor({
		extensions: [
			StarterKit,
			Placeholder.configure({
				placeholder: "Write something...",
			}),
		],
		editable: !disabled,
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
	// 		editor.setEditable(!disabled)
	// 	}
	// }, [editor, disabled])

	return (
		<div className={`border rounded-lg overflow-hidden ${error ? "border-red-600" : "border-gray-200"} ${disabled ? "opacity-80" : ""}`}>
			<TipTapToolbar editor={editor} disabled={disabled} />
			<div className={disabled ? "pointer-events-none" : ""}>
				<EditorContent editor={editor} {...props} />
			</div>
		</div>
	)
}
