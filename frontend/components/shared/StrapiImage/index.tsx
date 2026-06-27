import { StrapiImageData } from "@/types/strapi-image.model"
import Image, { ImageProps } from "next/image"

type Size = "thumbnail" | "small" | "medium" | "original"

type Props = {
	image?: StrapiImageData | null
	size?: Size
	fallback?: string
} & Omit<ImageProps, "src" | "alt">

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL?.replace("/api", "")!

function getImage(image?: StrapiImageData | null, size: Size = "original") {
	if (!image) return null

	const file = size !== "original" && image.formats?.[size] ? image.formats[size] : image

	if (!file?.url) return null

	const url = file.url.startsWith("http") ? file.url : `${BASE_URL}${file.url}`

	return {
		url,
		width: file.width,
		height: file.height,
	}
}

export default function StrapiImage({
	image,
	size = "original",
	fallback = "/images/fallback-book.png",
	...props
}: Props) {
	const img = getImage(image, size)

	if (!img) {
		return <Image src={fallback} alt="fallback image" width={400} height={300} {...props} />
	}

	return (
		<Image
			unoptimized={false}
			priority={false}
			src={img.url}
			alt={image?.alternativeText || image?.name || "image"}
			width={img.width}
			height={img.height}
			{...props}
		/>
	)
}
