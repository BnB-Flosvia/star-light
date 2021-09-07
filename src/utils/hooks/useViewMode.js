import { useMediaQuery } from "react-responsive"

export default function useViewMode(smallViewWidth = 360, mediumViewWidth = 768) {
  const isSmallView = useMediaQuery({
    query: `(max-width: ${smallViewWidth}px)`,
  })
  const isMediumView = useMediaQuery({
    query: `(min-width: ${smallViewWidth}px) and (max-width: ${mediumViewWidth}px)`,
  })
  const isLargeView = !(isSmallView || isMediumView)

  return [isSmallView, isMediumView, isLargeView]
}
