/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param imgRef - Image Ref
 * @param crop - pixelCrop Object
 */

export default async function getCroppedImg(imgRef, crop) {
  const image = imgRef.current
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const pixelRatio = window.devicePixelRatio

  canvas.width = crop.width * pixelRatio * scaleX
  canvas.height = crop.height * pixelRatio * scaleY

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = "high"

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  )

  // As a blob
  return new Promise((resolve) => {
    resolve(canvas.toDataURL("image/jpeg"))
  })
}
