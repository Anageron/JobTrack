/* eslint-disable regexp/no-obscure-range */
/* eslint-disable regexp/no-super-linear-backtracking */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email обязателен'
  }
  if (!isValidEmail(email)) {
    return 'Неверный формат email'
  }
  return null
}

export const MIN_PASSWORD_LENGTH = 3

export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Пароль обязателен'
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`
  }
  return null
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-Zа-яА-Я\s-]+$/.test(name)
}

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return 'Имя обязательно'
  }
  if (name.trim().length < 2) {
    return 'Имя должно быть не короче 2 символов'
  }
  if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(name)) {
    return 'Имя может содержать только буквы, пробелы и дефисы'
  }
  return null
}
