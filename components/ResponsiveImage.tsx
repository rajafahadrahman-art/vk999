import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function ResponsiveImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 720px",
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  );
}
