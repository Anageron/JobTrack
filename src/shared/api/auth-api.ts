export const authApi = {
  login(email: string, password: string): Promise<boolean> {
    return Promise.resolve(email === 'test@test.com' && password === '123')
  },
}
