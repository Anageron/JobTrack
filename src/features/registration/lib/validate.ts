import {
  validateEmail,
  validateName,
  validatePassword,
} from '@/shared/lib/validation'

export function validateAuthForm(email: string, password: string, name: string) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    name: validateName(name),
  }
}
