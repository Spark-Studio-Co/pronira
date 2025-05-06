import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/shared/ui/button";
import { useSubscriptionPopupStore } from "../store/use-subscription-popup-store";

export const SubscriptionAlert = () => {
  const { isOpen, close } = useSubscriptionPopupStore();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-lg bg-white dark:bg-[#222] p-6 shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-semibold text-main mb-4">
            Подписка неактивна
          </Dialog.Title>
          <p className="text-dark text-[16px] mb-6">
            Чтобы запустить парсер, необходимо активировать подписку.
          </p>
          <div className="flex justify-end">
            <Button
              text="Перейти к тарифам"
              onClick={() => {
                close();
                window.location.href = "/tariffs";
              }}
              variant="primary"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
