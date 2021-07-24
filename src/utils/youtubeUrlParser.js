export default function youtubeUrlParser(url) {
  const timeToSec = (str) => {
    let sec = 0
    if (/h/.test(str)) {
      sec += parseInt(str.match(/(\d+)h/, "$1")[0], 10) * 60 * 60
    }
    if (/m/.test(str)) {
      sec += parseInt(str.match(/(\d+)m/, "$1")[0], 10) * 60
    }
    if (/s/.test(str)) {
      sec += parseInt(str.match(/(\d+)s/, "$1")[0], 10)
    }
    return sec
  }

  const matchYoutubeUrl = () => {
    const p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    if (url.match(p)) {
      return url.match(p)[1]
    }
    return false
  }

  const isValidUrl = matchYoutubeUrl()

  const videoId = /^https?:\/\/(www\.)?youtu\.be/.test(url)
    ? url.replace(/^https?:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/, "$2")
    : url.replace(/.*\?v=([\w-]{11}).*/, "$1")
  const videoStartTime = /[^a-z]t=/.test(url)
    ? url.replace(/^.+t=([\dhms]+).*$/, "$1")
    : 0
  const videoStartSeconds = videoStartTime ? timeToSec(videoStartTime) : 0

  const videoThumbnailUrl = `/vi/${videoId}/0.jpg`

  return {
    id: videoId,
    isValidUrl,
    startString: videoStartTime,
    startSeconds: videoStartSeconds,
    thumbnailUrl: videoThumbnailUrl,
  }
}
