"use client";

import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function PageHeader({
  title,
  buttonText,
  buttonHref
}: PageHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-medium">{t(title)}</h1>
      {buttonText && (
        <Link href={buttonHref}>
          <Button>{t(buttonText)}</Button>
        </Link>
      )}
    </div>
  );
}
