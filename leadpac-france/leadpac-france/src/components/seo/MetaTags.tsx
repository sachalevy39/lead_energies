import { Metadata } from 'next';

type OGType = 
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: OGType;
  canonical?: string;
}

export function MetaTags({
  title,
  description,
  keywords,
  ogImage = '/og-image.png',
  ogUrl,
  ogType = 'website',
  canonical,
}: MetaTagsProps): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: ogType,
      url: ogUrl,
      images: [{ url: ogImage }],
    },
    alternates: {
      canonical,
    },
  };
}

export default MetaTags;
