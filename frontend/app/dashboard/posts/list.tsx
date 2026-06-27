"use client";

import { useTable } from "@refinedev/core";
import { Post } from "../../../types/post.model";
import StrapiRichTextBlocks from "@/components/shared/StrapiRichTextBlock";

export default function PostList() {
  const {
    tableQuery: { data, isLoading, isError },
  } = useTable<Post>({
    resource: "posts",
  });

  const posts = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load posts.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-lg border p-4"
        >
          <h2 className="text-lg font-semibold">{post.title}</h2>

          <StrapiRichTextBlocks content={post.content!} />

          <div className="mt-4 text-sm text-muted-foreground">
            Author: {post.authorId}
            <br />
            Category: {post.category?.id ?? "-"}
            <br />
            Published:{" "}
            {new Date(post.publishedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}