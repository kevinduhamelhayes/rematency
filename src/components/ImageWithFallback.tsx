"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  className,
  sizes,
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "fill">) {
  const [error, setError] = useState(false);

  // Default placeholder color
  const fallbackSrc = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(alt)}`;

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      onError={() => setError(true)}
      {...props}
    />
  );
} 