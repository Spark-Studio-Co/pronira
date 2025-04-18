// shared/ui/auth-modal.tsx
import { FC } from "react";
import { createPortal } from "react-dom";

interface UnauthorizedPopupProps {
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export const UnauthorizedPopup: FC<UnauthorizedPopupProps> = ({
  onClose,
  onLogin,
  onRegister,
}) => {
  return createPortal(
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[30vw] shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Вы не авторизованы
        </h2>
        <p className="mb-6 text-center">
          Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить оплату.
        </p>
        <div className="flex justify-between gap-4">
          <button
            className="w-full bg-main text-white py-2 rounded"
            onClick={onLogin}
          >
            Войти
          </button>
          <button
            className="w-full bg-gray-300 text-black py-2 rounded"
            onClick={onRegister}
          >
            Зарегистрироваться
          </button>
        </div>
        <button
          className="mt-4 text-sm text-gray-500 underline"
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </div>,
    document.body
  );
};
