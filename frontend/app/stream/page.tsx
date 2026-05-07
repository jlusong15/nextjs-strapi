"use client"

import { useEffect, useState } from "react"
import SubPageLayout from "../components/layout/Subpages"

type WikiChange = {
	id: number
	type: string
	title: string
	user: string
	server_name: string
	comment: string
	meta: {
		domain: string
	}
}

export default function StreamPage() {
	const [changes, setChanges] = useState<WikiChange[]>([])
	const [connected, setConnected] = useState(false)

	useEffect(() => {
		const eventSource = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange")

		eventSource.onopen = () => {
			console.log("Connected to Wikimedia SSE")
			setConnected(true)
		}

		eventSource.onmessage = (event) => {
			try {
				const data: WikiChange = JSON.parse(event.data)

				setChanges((prev) => {
					const updated = [data, ...prev]

					// keep only latest 10 items
					return updated.slice(0, 10)
				})
			} catch (error) {
				console.error("Parse error:", error)
			}
		}

		eventSource.onerror = (error) => {
			console.error("SSE error:", error)

			setConnected(false)

			eventSource.close()
		}

		return () => {
			eventSource.close()
		}
	}, [])

	return (
		<div className="w-full">
			<SubPageLayout title="Wikimedia Live Stream">
				<div className="border-b border-b-gray-100 pb-2 mb-5">
					<small className="text-gray-500!">Live Wikipedia edits using Server-Sent Events (Latest 10 items)</small>
					<div className="mt-4">
						Status:{" "}
						<span className={connected ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
							{connected ? "Connected" : "Disconnected"}
						</span>
					</div>
				</div>
				<div className="py-5 my-2.5 flex flex-col gap-5">
					<div className="space-y-4">
						{changes.map((change, index) => (
							<div key={`${change.id}-${index}`} className="border rounded-xl p-4 shadow-sm">
								<div className="flex items-center justify-between gap-4">
									<h2 className="font-bold text-lg">{change.title}</h2>

									<span className="text-sm bg-gray-100 px-2 py-1 rounded">{change.type}</span>
								</div>

								<div className="mt-2 text-sm text-gray-600">
									User: <span className="font-medium">{change.user}</span>
								</div>

								<div className="text-sm text-gray-600">
									Wiki: <span className="font-medium">{change.server_name}</span>
								</div>

								{change.comment && <div className="mt-3 text-sm">Comment: {change.comment}</div>}

								<div className="mt-3 text-xs text-gray-400">Domain: {change.meta?.domain}</div>
							</div>
						))}
					</div>
				</div>
			</SubPageLayout>
		</div>
	)
}
