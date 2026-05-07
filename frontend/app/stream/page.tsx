"use client"

import { useEffect, useState } from "react"

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
		const eventSource = new EventSource(
			"https://stream.wikimedia.org/v2/stream/recentchange"
		)

		eventSource.onopen = () => {
			console.log("Connected to Wikimedia SSE")
			setConnected(true)
		}

		eventSource.onmessage = (event) => {
			try {
				const data: WikiChange = JSON.parse(event.data)

				setChanges((prev) => {
					const updated = [data, ...prev]

					// keep only latest 20 items
					return updated.slice(0, 20)
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
		<main className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-2">
						Wikimedia Live Stream
					</h1>

					<p className="text-gray-500">
						Live Wikipedia edits using Server-Sent Events
					</p>

					<div className="mt-4">
						Status:{" "}
						<span
							className={
								connected
									? "text-green-600 font-semibold"
									: "text-red-600 font-semibold"
							}
						>
							{connected
								? "Connected"
								: "Disconnected"}
						</span>
					</div>
				</div>

				<div className="space-y-4">
					{changes.map((change, index) => (
						<div
							key={`${change.id}-${index}`}
							className="border rounded-xl p-4 shadow-sm"
						>
							<div className="flex items-center justify-between gap-4">
								<h2 className="font-bold text-lg">
									{change.title}
								</h2>

								<span className="text-sm bg-gray-100 px-2 py-1 rounded">
									{change.type}
								</span>
							</div>

							<div className="mt-2 text-sm text-gray-600">
								User:{" "}
								<span className="font-medium">
									{change.user}
								</span>
							</div>

							<div className="text-sm text-gray-600">
								Wiki:{" "}
								<span className="font-medium">
									{change.server_name}
								</span>
							</div>

							{change.comment && (
								<div className="mt-3 text-sm">
									Comment: {change.comment}
								</div>
							)}

							<div className="mt-3 text-xs text-gray-400">
								Domain: {change.meta?.domain}
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	)
}