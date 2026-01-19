import { groq } from 'next-sanity';

export const portfolioQuery = groq`
  *[_type == "portfolio"][0] {
    _id,
    title,
    subtitle,
    slug,
    owner,
    email
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    "thumbnail": thumbnail.asset->url,
    media[] {
      type,
      "url": select(
        type == "image" => image.asset->url,
        type == "video" => videoUrl
      ),
      "thumbnail": select(
        type == "video" => videoThumbnail.asset->url,
        null
      ),
      alt
    },
    tags,
    year,
    featured
  }
`;

export const collectionsQuery = groq`
  *[_type == "collection"] | order(_createdAt desc) {
    _id,
    name,
    "id": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    "projects": projects[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      "thumbnail": thumbnail.asset->url,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        "thumbnail": select(
          type == "video" => videoThumbnail.asset->url,
          null
        ),
        alt
      },
      tags,
      year,
      featured
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    longDescription,
    "thumbnail": thumbnail.asset->url,
    media[] {
      type,
      "url": select(
        type == "image" => image.asset->url,
        type == "video" => videoUrl
      ),
      "thumbnail": select(
        type == "video" => videoThumbnail.asset->url,
        null
      ),
      alt
    },
    tags,
    year,
    featured
  }
`;

export const collectionByIdQuery = groq`
  *[_type == "collection" && slug.current == $id][0] {
    _id,
    name,
    "id": slug.current,
    description,
    "thumbnail": thumbnail.asset->url,
    "projects": projects[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      "thumbnail": thumbnail.asset->url,
      media[] {
        type,
        "url": select(
          type == "image" => image.asset->url,
          type == "video" => videoUrl
        ),
        "thumbnail": select(
          type == "video" => videoThumbnail.asset->url,
          null
        ),
        alt
      },
      tags,
      year,
      featured
    }
  }
`;
