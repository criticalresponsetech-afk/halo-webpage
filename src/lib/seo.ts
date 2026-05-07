import { useEffect } from 'react'
import { brandName, heroImageUrl } from './content'

export function usePageTitle(title: string) {
  usePageSeo({ title })
}

type PageSeoOptions = {
  title: string
  description?: string
  path?: string
  image?: string
  noindex?: boolean
}

const defaultDescription =
  'HALO Protection Services provides licensed private security, armed security, and mobile patrol coverage for residential, commercial, construction, and industrial properties.'

const defaultPath = '/'

function setMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setCanonical(url: string) {
  let tag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!tag) {
    tag = document.createElement('link')
    tag.rel = 'canonical'
    document.head.appendChild(tag)
  }
  tag.href = url
}

export function usePageSeo({
  title,
  description = defaultDescription,
  path = defaultPath,
  image = heroImageUrl,
  noindex = false,
}: PageSeoOptions) {
  useEffect(() => {
    const fullTitle = title === brandName ? title : `${title} | ${brandName}`
    document.title = fullTitle

    const origin = window.location.origin
    const canonicalUrl = new URL(path, origin).toString()
    const imageUrl = new URL(image, origin).toString()
    const robots = noindex ? 'noindex, nofollow' : 'index, follow'

    setCanonical(canonicalUrl)
    setMetaByName('description', description)
    setMetaByName('robots', robots)

    setMetaByProperty('og:type', 'website')
    setMetaByProperty('og:site_name', brandName)
    setMetaByProperty('og:title', fullTitle)
    setMetaByProperty('og:description', description)
    setMetaByProperty('og:url', canonicalUrl)
    setMetaByProperty('og:image', imageUrl)

    setMetaByName('twitter:card', 'summary_large_image')
    setMetaByName('twitter:title', fullTitle)
    setMetaByName('twitter:description', description)
    setMetaByName('twitter:image', imageUrl)
  }, [description, image, noindex, path, title])
}
