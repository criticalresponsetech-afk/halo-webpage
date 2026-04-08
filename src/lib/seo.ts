import { useEffect } from 'react'
import { brandName } from './content'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | ${brandName}`
  }, [title])
}
