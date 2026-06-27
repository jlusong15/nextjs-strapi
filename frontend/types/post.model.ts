import { StrapiRichTextBlock } from "./book-review.model";

export interface Post {
	id: string;
	title: string;
	content: StrapiRichTextBlock[] | null
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	authorId?: number;
	category?: {
		id: string;
	} | null;
}