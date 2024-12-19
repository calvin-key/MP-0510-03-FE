"use client"

import { NuqsAdapter } from "nuqs/adapters/next/pages";
import { FC, PropsWithChildren, Suspense } from "react";

const NuqsProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NuqsAdapter>
      <Suspense>{children}</Suspense>
    </NuqsAdapter>
  );
};

export default NuqsProvider;
