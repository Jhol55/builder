
export interface ImageVersion {
    url: string;
    width: number;
    isImageFallback: boolean
  }
  
export  interface OptimizedImageProps {
    imageVersions: ImageVersion[];
    alt: string;
    useWebP?: boolean;
    className?: string;
  }

export interface AttributesProps {
    imageVersions: ImageVersion[]
    altText: string;
    srcSet: string
    useWebP: boolean
}

export interface BlockProps {
    attributes: AttributesProps;
    setAttributes: (newAttributes: Partial<AttributesProps>) => void;
}