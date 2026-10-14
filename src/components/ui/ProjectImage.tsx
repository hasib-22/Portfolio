import Image from 'next/image';
import { motion } from 'framer-motion'
interface ProjectImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

export function ProjectImage({
  src,
  alt,
  sizes,
  className = '',
  priority = false,
}: ProjectImageProps) {
  return (
    <motion.div
      initial={{ z: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-xl ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt} preview unavailable`}
          className="grid aspect-video place-items-center text-sm text-neutral-500"
        >
          Preview unavailable
        </div>
      )}
    </motion.div>
  );
}
