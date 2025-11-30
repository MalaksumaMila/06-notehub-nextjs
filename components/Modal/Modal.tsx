import css from './Modal.module.css';
import { createPortal } from 'react-dom';

import { useEffect } from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, closeModal }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={closeModal}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')!
  );
}
