interface NodeImageProps {
  src: string;
  alt?: string;
  contentLength?: number;
}

function getAdaptiveImageSize(contentLength: number) {
  if (contentLength <= 70) return 'clamp(168px, 42vw, 210px)';
  if (contentLength <= 140) return 'clamp(152px, 38vw, 188px)';
  if (contentLength <= 220) return 'clamp(136px, 34vw, 168px)';
  return 'clamp(124px, 30vw, 148px)';
}

export default function NodeImage({
  src,
  alt = '',
  contentLength = 0,
}: NodeImageProps) {
  const imageSize = getAdaptiveImageSize(contentLength);

  return (
    <div className="mb-4 flex items-center justify-center">
      <div
        className="relative aspect-square overflow-hidden rounded-[28px] border border-white/50 shadow-[var(--shadow-contact)]"
        style={{ width: imageSize }}
      >
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
