import { describe, it, expect } from 'vitest'
import { formatDate } from './formating'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const formatted = formatDate('2024-12-25T10:00:00')
    expect(formatted).toBe('25.12.2024')
  })

  it('should handle different date formats', () => {
    const formatted = formatDate('2024-01-01')
    expect(formatted).toBe('01.01.2024')
  })
})