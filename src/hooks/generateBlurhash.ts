import { APIError, CollectionBeforeValidateHook } from 'payload'
import { getPlaiceholder } from 'plaiceholder'
import { Media } from '../payload-types'

export const generateBlurHash: CollectionBeforeValidateHook<Media> = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create' && operation !== 'update') return data

  try {
    const buffer = req?.file?.data

    let blurhash = data?.blurhash || null

    // Generate new blurhash if a file is uploaded
    if (buffer) {
      const { base64 } = await getPlaiceholder(buffer, { size: 32 })
      blurhash = base64
    }

    // Apply the blurhash to all image sizes
    const updatedSizes = Object.fromEntries(
      Object.entries(data?.sizes || {}).map(([sizeKey, sizeData]) => [
        sizeKey,
        { ...sizeData, blurhash },
      ]),
    )

    return {
      ...data,
      sizes: updatedSizes,
      blurhash,
    }
  } catch (error) {
    console.error('Error generating blurhash:', error)
    throw new APIError('Failed to generate blur data URL')
  }
}
