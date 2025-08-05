import { describe, it, expect } from 'vitest'
import { validationSchema } from './validation' 

describe('validationSchema', () => {
    it('should validate correct event data', async () => {
        const validData = {
          title: 'Test Event',
          description: 'This is a test description with more than 10 characters',
          date: new Date('2024-12-25T10:00:00'),
          location: 'Rybnik',
          image: 'https://example.com/image.jpg',
          category: 'Sport',
          phone: '123456789',
          email: 'test@example.com'
        }
    
        await expect(validationSchema.validate(validData)).resolves.toEqual(validData)
    })

    it('should reject empty title', async () => {
        const invalidData = {
          title: '',
          description: 'Valid description',
          date: new Date('2024-12-25T10:00:00'),
          location: 'Warszawa',
          image: 'https://example.com/image.jpg',
          category: 'Sport',
          phone: '123456789',
          email: 'test@example.com'
        }
    
        await expect(validationSchema.validate(invalidData)).rejects.toThrow('Tytuł jest wymagany')
      })

      it('should reject too short phone number', async () => {
        const invalidData = {
          title: 'test',
          description: 'Valid description',
          date: new Date('2024-12-25T10:00:00'),
          location: 'Warszawa',
          image: 'https://example.com/image.jpg',
          category: 'Sport',
          phone: '123',
          email: 'test@example.com'
        }
    
        await expect(validationSchema.validate(invalidData)).rejects.toThrow('Niepoprawny numer telefonu')
      })

      it('should reject invalid emial', async () => {
        const invalidData = {
          title: 'test',
          description: 'Valid description',
          date: new Date('2024-12-25T10:00:00'),
          location: 'Warszawa',
          image: 'https://example.com/image.jpg',
          category: 'Sport',
          phone: '123456789',
          email: 'testexample.com'
        }
    
        await expect(validationSchema.validate(invalidData)).rejects.toThrow('Niepoprawny adres email')
      })
})  