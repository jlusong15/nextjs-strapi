"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { useEffect, useRef, useState } from "react"
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
const streamUrl = "https://stream.wikimedia.org/v2/stream/recentchange"

export default function StreamPage() {
	const [changes, setChanges] = useState<WikiChange[]>([])
	const [connected, setConnected] = useState(false)
	const parentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const eventSource = new EventSource(streamUrl)

		eventSource.onopen = () => {
			console.log("Connected to Wikimedia SSE")
			setConnected(true)
		}

		eventSource.onmessage = (event) => {
			try {
				const data: WikiChange = JSON.parse(event.data)
				setChanges((prev) => [data, ...prev].slice(0, 5000))
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

	const virtualizer = useVirtualizer({
		count: changes.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 160,
		overscan: 5,
		measureElement: (el) => el?.getBoundingClientRect().height,
	})

	return (
		<div className="w-full">
			<SubPageLayout title="Wikimedia Live Stream">
				<div className="border-b border-b-gray-100 pb-4 mb-2">
					<small className="text-gray-500">
						Live Wikipedia Stream of edits using Server-Sent Events with TanStack Virtualizer for efficient rendering.
					</small>

					<div className="mt-4">
						<small className="text-gray-500">Status: </small>
						<small className={connected ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
							{connected ? "Connected" : "Disconnected"}
						</small>
					</div>

					<div className="text-gray-500">
						<small>Total Items: {changes?.length || 0}</small>
					</div>
				</div>

				<div ref={parentRef} className="h-175 overflow-auto">
					<div
						style={{
							height: `${virtualizer.getTotalSize()}px`,
							width: "100%",
							position: "relative",
						}}
					>
						{virtualizer.getVirtualItems().map((virtualRow) => {
							const change = changes[virtualRow.index]

							if (!change) return null

							return (
								<div
									ref={virtualizer.measureElement}
									key={virtualRow.key}
									data-index={virtualRow.index}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										transform: `translateY(${virtualRow.start}px)`,
									}}
									className="py-2"
								>
									<div className="border rounded-xl p-4 shadow-sm bg-white">
										<div className="flex items-start justify-between gap-4">
											<h2 className="font-bold text-lg wrap-break-word">{change.title}</h2>

											<span className="text-sm bg-gray-100 px-2 py-1 rounded whitespace-nowrap">{change.type}</span>
										</div>

										<div className="mt-3 text-sm text-gray-600">
											User: <span className="font-medium">{change.user}</span>
										</div>

										<div className="text-sm text-gray-600">
											Wiki: <span className="font-medium">{change.server_name}</span>
										</div>

										{change.comment && (
											<div className="mt-3 text-sm wrap-break-word">
												<span className="font-medium">Comment:</span> {change.comment}
											</div>
										)}

										<div className="mt-4 text-xs text-gray-400">Domain: {change.meta?.domain}</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</SubPageLayout>
		</div>
	)
}
