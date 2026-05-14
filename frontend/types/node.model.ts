type InputNode = {
	type: string
	content?: InputNode[]
	text?: string
}

type InputDoc = {
	type: "doc"
	content: InputNode[]
}

type OutputNode = {
	type: string
	children?: OutputNode[]
	text?: string
}