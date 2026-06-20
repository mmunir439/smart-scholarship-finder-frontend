"use client";

import Link from "next/link";
import { useGetStartedHref } from "@/app/utils/authRedirect";

export default function GetStartedLink({ className, children, onClick, ...props }) {
  const href = useGetStartedHref();

  return (
    <Link href={href} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
