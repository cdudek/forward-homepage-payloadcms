import { htmlDecode } from './htmlDecode'

export const renderedTitle = (title: string, gradientText: string, decode: boolean = true) => {
  if (!gradientText) return title

  if (decode) {
    title = htmlDecode(title)
    gradientText = htmlDecode(gradientText)
  }

  const parts = title.split(gradientText)
  if (parts.length === 1) return title

  return (
    <>
      {parts[0]}
      <span className="bg-gradient-to-r from-fwd-purple via-fwd-red to-fwd-orange bg-clip-text text-transparent">
        {gradientText}
      </span>
      {parts[1]}
    </>
  )
}

export default renderedTitle
