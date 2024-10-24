import { CSSProperties } from "react";

export interface ModalProps {
  onClose: () => void;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

function Modal({
  onClose,
  width = "500px",
  height = "300px",
  children,
}: ModalProps) {
  const modalStyle: CSSProperties = {
    width: width || "500px",
    height: height || "300px",
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalContent"
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
