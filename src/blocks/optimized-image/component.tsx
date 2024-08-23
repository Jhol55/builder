import * as React from 'react';

import { OptimizedImageProps } from './types';

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  imageVersions,
  alt = '',
  className,
}) => {
  const sortedVersions = [...imageVersions].sort((a, b) => a.width - b.width);
  const fallbackImage = sortedVersions.find(version => version.isImageFallback) || sortedVersions[0];

  const sources = sortedVersions.map((version, index) => {
    const media = `(max-width: ${sortedVersions[index].width}px)`;
    return (
      <source
        key={index}
        media={media}
        srcSet={version.url}
      />
    );
  });

  return (
    <picture>
      {sources}
      <img
        src={fallbackImage.url}
        alt={alt}
        className={className}
        style={{ width: fallbackImage.width, height: 'auto' }}
        loading='lazy'
      />
    </picture>
  );
};
