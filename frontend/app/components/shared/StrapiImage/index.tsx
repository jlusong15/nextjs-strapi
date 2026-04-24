import { StrapiImageData } from "@/app/types/strapi-image.model";
import Image, { ImageProps } from "next/image";

type Size = "thumbnail" | "small" | "medium" | "original";

type Props = {
  image?: StrapiImageData | null;
  size?: Size;
  fallback?: string;
} & Omit<ImageProps, "src" | "alt">;

const BASE_URL = process.env.STRAPI_URL?.replace('/api', '') || "";
console.log('STRAPI_URL', BASE_URL)

function getImage(image?: StrapiImageData | null, size: Size = "original") {
  if (!image) return null;

  if (size !== "original" && image.formats?.[size]) {
    return {
      url: BASE_URL + image.formats[size]!.url,
      width: image.formats[size]!.width,
      height: image.formats[size]!.height,
    };
  }

  return {
    url: BASE_URL + image.url,
    width: image.width,
    height: image.height,
  };
}

export default function StrapiImage({
  image,
  size = "original",
  fallback = "/images/fallback-book.png",
  ...props
}: Props) {
  const img = getImage(image, size);

  if (!img) {
    return (
      <Image
        src={fallback}
        alt="fallback image"
        width={400}
        height={300}
        {...props}
      />
    );
  }

  return (
    <Image
      src={img.url}
      alt={image?.alternativeText || image?.name || "image"}
      width={img.width}
      height={img.height}
      {...props}
    />
  );
}