import he from 'he'

export const htmlDecode = (value: string): string => {
  return he.decode(value)
}

export default htmlDecode
