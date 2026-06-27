"use client";

import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Refine
      dataProvider={DataProvider(BASE_URL)}
      resources={[
        {
          name: "posts",
          list: "/dashboard/posts",
        },
      ]}
    >
      {children}
    </Refine>
  );
}