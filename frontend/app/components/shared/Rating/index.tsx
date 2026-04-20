"use client"

import { useState } from "react";

type StarRatingProps = {
	value?: number;
	max?: number;
	size?: number;
	onChange?: (rating: number) => void;
	readonly?: boolean;
};

export default function StarRating({
	value = 0,
	max = 5,
	size = 24,
	onChange,
	readonly = false,
}: StarRatingProps) {
	const [hoverValue, setHoverValue] = useState<number | null>(null);

	const handleClick = (rating: number) => {
		if (readonly) return;
		onChange?.(rating);
	};

	const displayValue = hoverValue ?? value;

	return (
		<div style={{ display: "flex", gap: 6 }}>
			{Array.from({ length: max }, (_, i) => {
				const starValue = i + 1;
				const filled = starValue <= displayValue;

				return (
					<button
						key={i}
						type="button"
						onClick={() => handleClick(starValue)}
						onMouseEnter={() => !readonly && setHoverValue(starValue)}
						onMouseLeave={() => setHoverValue(null)}
						style={{
							cursor: readonly ? "default" : "pointer",
							background: "none",
							border: "none",
							padding: 0,
							lineHeight: 0,
						}}
					>
						<svg
							width={size}
							height={size}
							viewBox="0 0 24 24"
							fill={filled ? "#facc15" : "none"}
							stroke="#facc15"
							strokeWidth="2"
						>
							<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
						</svg>
					</button>
				);
			})}
		</div>
	);
}