import * as React from "react"

interface IModalProps {
  children: React.ReactNode,
  style?: React.CSSProperties
}

const Modal = (props: IModalProps) => {
  return (
    <div style={blackScreenStyle}>
      <div style={{...modalStyle, ...(props.style || {})}}>
        {props.children}
      </div>
    </div>
  )
};

const blackScreenStyle: React.CSSProperties = {
  alignItems: 'center',
  background: "rgba(0, 0, 0, 0.5)",
  display: 'flex',
  height: "100vh",
  justifyContent: 'center',
  position: "fixed",
  right: "0",
  top: "0",
  width: "100vw",
  zIndex: 1,
};

const modalStyle: React.CSSProperties = {
  background: "#F2F5F8",
  borderRadius: '7px',
  minWidth: '25em',
  padding: '2rem',
};

export default Modal
