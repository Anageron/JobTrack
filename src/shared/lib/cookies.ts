/* eslint-disable prefer-template */
export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'),
  )
  if (!matches || !matches[1]) {
    return undefined
  }
  try {
    return decodeURIComponent(matches[1])
  }
  catch {
    return undefined
  }
}

export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: string | number | Date | boolean } = {},
) {
  props = {
    path: '/',
    ...props,
  }

  let exp = props.expires
  if (exp && typeof exp === 'number') {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }

  if (exp && exp instanceof Date) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 })
}

export function getCookieOptions() {
  return {
    path: '/',
    sameSite: 'lax',
    // TODO: раскомментировать в продакшене
    // secure: process.env.NODE_ENV === 'production'
    expires: 7 * 24 * 60 * 60,
  }
}
