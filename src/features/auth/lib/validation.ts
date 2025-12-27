import {
  validateEmail,
  validatePassword,
} from '@/shared/lib/validation'

export function validateAuthForm(email: string, password: string) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  }
}
