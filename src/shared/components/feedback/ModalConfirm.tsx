import { createPortal } from 'react-dom';
import { Button } from '@shared/components/ui';

type ModalProps = {
  readonly title?: string;
  readonly message: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
};

export const ConfirmModal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-9999">
      <div className="bg-[#2b2b2b] py-6 px-8 rounded-lg min-h-32 max-w-screen-[90vw] shadow-[3px_5px_8px_rgba(255,255,255,0.5)]">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
