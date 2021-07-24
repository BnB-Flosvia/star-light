import ReactDOM from "react-dom"

export const PORTAL_ELEMENT_ID = "root-portal"

export default function PopupPortal({ children }) {
  const el = document.getElementById(PORTAL_ELEMENT_ID)
  return ReactDOM.createPortal(children, el)
}
