interface NodeImageProps {
  src: string;
  alt?: string;
}

export default function NodeImage({ src, alt = '' }: NodeImageProps) {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="relative w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-ambient)]">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
