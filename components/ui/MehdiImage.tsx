import Image from "next/image";
import { getMehdiImage, type MehdiImageId } from "@/content/images/mehdi";

type MehdiImageProps = {
  imageId: MehdiImageId;
  alt: string;
  title?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  aspect?: "portrait" | "landscape" | "square";
  fill?: boolean;
};

const aspectClasses = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export function MehdiImage({
  imageId,
  alt,
  title,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspect = "portrait",
  fill = true,
}: MehdiImageProps) {
  const image = getMehdiImage(imageId);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${aspectClasses[aspect]} ${className}`}
    >
      <Image
        src={image.src}
        alt={alt}
        title={title}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className="object-cover object-center"
      />
    </div>
  );
}
