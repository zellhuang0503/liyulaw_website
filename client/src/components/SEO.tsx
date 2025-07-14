import { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { siteMeta } from '../config/seo'

interface Props {
  title?: string
  description?: string
  children?: ReactNode
  jsonLd?: Record<string, any> | Record<string, any>[]
}

const SEO = ({ title, description, children, jsonLd }: Props) => {
  const metaTitle = title ?? siteMeta.defaultTitle
  const metaDescription = description ?? siteMeta.defaultDescription

  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteMeta.url}${siteMeta.logo}`} />
      <meta property="og:url" content={siteMeta.url} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {/* JSON-LD */}
      {jsonLdArray.map((obj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj, null, 2) }}
        />
      ))}

      {children as any}
    </Helmet>
  )
}

export default SEO
