import { faker } from '@faker-js/faker'

export const createSignupPayload = (overrides = {}) => {
  const password = faker.internet.password({ length: 12, pattern: /[A-Z0-9!@#$%^&*]/ }) // Ensure complexity
  return {
    email: faker.internet.email(),
    password: `A1!${password}`, // Guarantee complexity requirements: 1 upper, 1 number, 1 special
    ...overrides,
  }
}

export const createLoginPayload = (overrides = {}) => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
})
