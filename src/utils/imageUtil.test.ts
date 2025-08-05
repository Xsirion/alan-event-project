import { describe, it, expect } from 'vitest'
import { getImageUrl } from './imageUtil'

describe('getImageUrl', () => {
  it('should return default image when imagePath is null', () => {
    const result = getImageUrl(null)
    expect(result).toBe('/images/default.jpg')
  })

  it('should return default image when imagePath is empty string', () => {
    const result = getImageUrl('')
    expect(result).toBe('/images/default.jpg')
  })

  it('should return image url when imagePath is valid url', () => {
    const result = getImageUrl('https://images.unsplash.com/photo-test')
    expect(result).toBe('https://images.unsplash.com/photo-test')
  })
  it('should return image path when imagePath is valid path', () => {
    const result = getImageUrl('/images/test.jpg')
    expect(result).toBe('http://localhost:3000/images/test.jpg')
  })
})