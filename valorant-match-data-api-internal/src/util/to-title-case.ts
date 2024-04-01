export const toTitleCase = (string: string) => {
  return string.replace(/\w\S*/g, (text: string): string => {
    return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  })
}
