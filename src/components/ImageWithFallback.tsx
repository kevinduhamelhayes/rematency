"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  fallbackSrc?: string;
  style?: React.CSSProperties;
}

export function ImageWithFallback({
  src,
  alt,
  fill = false,
  className,
  sizes,
  fallbackSrc,
  style,
  ...props
}: ImageWithFallbackProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "fill">) {
  const [error, setError] = useState(false);

  // Default placeholder color or use provided fallback
  const defaultFallback = `https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(alt)}`;
  const fallbackImage = fallbackSrc || defaultFallback;

  return (
    <Image
      src={error ? fallbackImage : src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      style={style}
      onError={() => setError(true)}
      {...props}
    />
  );
}

// Add default export for compatibility
export default ImageWithFallback; 