"use client";

import { Layout } from "@/shared/ui/layout";
import { Link } from "react-router-dom";

export const SubscriptionPolicy = () => {
  return (
    <Layout
      isWelcome={false}
      isHeading
      heading="Соглашение о подписке"
      isCenter
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <section className="mb-6">
            <p className="text-dark mb-4">
              Настоящее соглашение регулирует условия использования платной
              подписки на платформе <strong>PointApp</strong>.
            </p>

            <h3 className="text-lg font-semibold text-main mb-2">
              1. Общие положения
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                1.1. Подписка предоставляет доступ к дополнительным функциям и
                возможностям сервиса.
              </li>
              <li>
                1.2. Оформляя подписку, пользователь соглашается с условиями
                настоящего Соглашения.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-main mt-6 mb-2">
              2. Условия подписки
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                2.1. Подписка является{" "}
                <strong>платной и автоматически возобновляемой</strong>.
              </li>
              <li>
                2.2. Подписка оформляется на период <strong>1 месяц</strong>.
              </li>
              <li>
                2.3. Стоимость подписки составляет{" "}
                <strong>299 рублей в месяц</strong>.
              </li>
              <li>
                2.4. Первое списание производится при оформлении подписки,
                последующие — автоматически в дату окончания оплаченного
                периода.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-main mt-6 mb-2">
              3. Согласие на списание средств
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                3.1. Пользователь дает <strong>явное согласие</strong> на
                автоматическое списание средств в соответствии с условиями
                подписки.
              </li>
              <li>
                3.2. Отмена подписки возможна в любой момент через раздел
                "Настройки" → "Подписка" или по обращению в службу поддержки.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-main mt-6 mb-2">
              4. Уведомления
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                4.1. Пользователь получает{" "}
                <strong>email или SMS-уведомление</strong> о продлении подписки
                за 3 дня до списания.
              </li>
              <li>
                4.2. В уведомлении указывается сумма и дата следующего списания,
                а также ссылка на отмену подписки.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-main mt-6 mb-2">
              5. Возврат средств
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                5.1. Возврат средств за уже оплаченный период не осуществляется,
                за исключением технических ошибок по вине сервиса.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-main mt-6 mb-2">
              6. Заключительные положения
            </h3>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                6.1. Оформление подписки означает полное согласие пользователя
                со всеми пунктами настоящего соглашения.
              </li>
              <li>
                6.2. Мы можем вносить изменения в условия подписки, уведомив
                пользователя за 7 дней до вступления изменений в силу.
              </li>
            </ul>

            <p className="text-sm text-gray-600 mt-6 italic">
              Последнее обновление: 11 апреля 2025
            </p>

            <label className="flex items-center mt-6">
              <input type="checkbox" className="mr-2" required />
              <span className="text-dark">
                Я ознакомлен(а) и согласен(а) с условиями подписки
              </span>
            </label>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-main text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Назад
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SubscriptionPolicy;
