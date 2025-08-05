import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock dla react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ eventId: '1' }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => 
    React.createElement('a', { href: to }, children),
}))

// Mock dla Redux
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}))

// Mock dla fetch
if (typeof globalThis !== 'undefined') {
  globalThis.fetch = vi.fn()
}