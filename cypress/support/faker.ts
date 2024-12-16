import { faker } from "@faker-js/faker";

export function generateRandomNumber(
  min: number = 100,
  max: number = 1000
): number {
  return faker.number.int({ min: min, max: max });
}

export function generateRandomString(length: number = 10): string {
  return faker.string.alphanumeric({ length: length });
}
