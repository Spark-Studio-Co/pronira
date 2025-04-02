"use client";

import { Layout } from "@/shared/ui/layout";
import { Link } from "react-router-dom";

export const PrivacyPolicyPage = () => {
  return (
    <Layout isWelcome isHeading heading="Политика конфиденциальности" isCenter>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <section className="mb-8">
            <p className="text-dark mb-4">
              Предоставляя свои персональные данные Пользователь даёт согласие
              на обработку, хранение и использование своих персональных данных
              на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г.
              в следующих целях:
            </p>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>осуществление поддержки клиентов;</li>
              <li>
                рассылка информации о маркетинговых событиях, рекламных акциях
                Продавца;
              </li>
              <li>
                проведение аудита и прочих внутренних исследований для повышения
                качества предоставляемых услуг.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Персональные данные
            </h2>
            <p className="text-dark mb-4">
              Под персональными данными подразумевается любая информация личного
              характера, которая позволяет установить личность
              Пользователя/Покупателя, в частности:
            </p>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>фамилия, имя, отчество;</li>
              <li>дата рождения;</li>
              <li>контактный телефон;</li>
              <li>адрес электронной почты;</li>
              <li>почтовый адрес.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Хранение и обработка данных
            </h2>
            <p className="text-dark mb-4">
              Персональные данные Пользователей хранятся только на электронных
              носителях и обрабатываются с использованием автоматизированных
              систем, кроме случаев, когда их ручная обработка необходима, чтобы
              исполнить требования законодательства.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Передача данных третьим лицам
            </h2>
            <p className="text-dark mb-4">
              Компания обязуется не передавать полученные персональные данные
              третьим лицам, кроме следующих случаев:
            </p>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                запросы уполномоченных органов государственной власти РФ только
                по основаниям и в порядке, установленным законодательством РФ;
              </li>
              <li>
                передача данных стратегическим партнерам, которые предоставляют
                Компании товары и услуги, или тем из них, которые помогают
                Компании реализовывать Потребителям товары и услуги. Третьим
                лицам мы предоставляем только минимальный объем персональных
                данных, который необходим для оказания нужной услуги или
                проведения транзакции.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-main mb-4">
              Изменения в политике конфиденциальности
            </h2>
            <p className="text-dark">
              Компания оставляет за собой право вносить в настоящие Правила
              изменения в одностороннем порядке при условии, что эти изменения
              не противоречат действующему законодательству РФ. Изменения
              условий настоящих правил вступают в силу после их публикации на
              Сайте.
            </p>
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

export default PrivacyPolicyPage;
