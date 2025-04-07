import { Layout } from "@/shared/ui/layout";
import { Link } from "react-router-dom";

export const UserAgreementPage = () => {
  return (
    <Layout isWelcome isHeading heading="Пользовательское соглашение" isCenter>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <section className="mb-8">
            <p className="text-dark mb-4">
              Настоящее Соглашение определяет условия использования
              Пользователями материалов и сервисов сайта проныра-сервис.рф(далее
              — «Сайт»).
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Условия предоставления услуг
            </h2>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                Объем предоставляемых Сайтом сервисов (услуг) может быть изменен
                в одностороннем порядке.
              </li>
              <li>
                Услуги предоставляются как есть. Сайт не несет ответственности
                за любые последствия, связанные с использованием услуг Сайта.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Обработка персональных данных
            </h2>
            <p className="text-dark mb-4">
              Сайт обязуется не передавать информацию о зарегистрированных
              пользователях Сайта третьим лицам. Пользователь дает свое согласие
              на обработку своих персональных данных только лишь в целях
              отправки информационных сообщений.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Взаимодействие с другими сайтами
            </h2>
            <p className="text-dark mb-4">
              Сайт (включая программно-аппаратную инфрастуктуру), взаимодействуя
              с досками объявлений и другими сайтами в интернете действует
              исключительно в интересах и по заданиям Пользователя. Пользователь
              самостоятельно задает ссылки, которые необходимо проверять и
              параметры их проверки (периодичность проверки и др.). Сайт не
              несет ответственности за претензии со стороны владельцев и прочих
              представителей проверяемых досок объявлений и сайтов, так как
              действует исключительно в интересах и по заданию Пользователя.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Аккаунт пользователя
            </h2>
            <p className="text-dark mb-4">
              Аккаунт Пользователя может быть блокирован или удален по
              усмотрению администрации Сайта.
            </p>
            <p className="text-dark mb-4">
              Пользователь обязуется самостоятельно проверять актуальность
              условий данного пользовательского соглашения.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Информационные сообщения
            </h2>
            <ul className="list-disc pl-6 text-dark space-y-2">
              <li>
                Регистрируясь на сайте Пользователь соглашается получать
                информационные сообщения с сайта.
              </li>
              <li>
                Информационные сообщения с Сайта могут содержать рекламную
                информацию.
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Использование файлов cookie
            </h2>
            <p className="text-dark mb-4">
              На Сайте (включая поддомены) используются куки (Cookies).
              Использование кук необходимо для идентификации пользователя, а
              также для анализа действия посетителей на сайте с помощью
              соответствующих сервисов (таких как Google Analytics и Yandex
              Метрикой), с целью улучшения функционала и содержания сайта.
            </p>
            <p className="text-dark mb-4">
              Вы можете отключить куки в браузере, однако, в этом случае мы не
              сможем достоверно Вас идентифицировать и Вы не сможете полноценно
              использовать функционал сайта.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Принятие соглашения
            </h2>
            <p className="text-dark mb-4">
              Пользователь подтверждает, что ознакомлен со всеми пунктами
              настоящего Соглашения и безусловно принимает их.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-main mb-4">
              Правообладатель
            </h2>
            <p className="text-dark">
              Сайт Интернет-ресурса проныра-сервис.рф является собственностью ИП
              Тымченко Я.В
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

export default UserAgreementPage;
