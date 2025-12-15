import Image from "next/image";

export default function MediaBlock({
  type = "image", // "image" or "video"
  src,
  alt = "",
  caption,
  aspectRatio = "video", // "video" (16:9), "square", "portrait", or custom class
  className = ""
}) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const aspectClass = aspectClasses[aspectRatio] || aspectRatio;

  return (
    <div className={`flex flex-col gutter-xs ${className}`}>
      <div className={`w-full ${aspectClass} bg-white/5 rounded-lg overflow-hidden`}>
        {type === "video" && src ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : type === "image" && src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-small opacity-40">
              {type === "video" ? "Video" : "Image"}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <p className="text-tiny text-400 opacity-60 text-center">{caption}</p>
      )}
    </div>
  );
}
