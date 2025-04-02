"use client";

import { Layout } from "@/shared/ui/layout";
import { Link } from "react-router-dom";

export const ReadmePage = () => {
  return (
    <Layout isWelcome={false} isHeading heading="Прочитай меня" isCenter>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <section className="mb-8">
            <p className="text-dark mb-4">
              Проныра, хоть и является поисковым аретефактом, но магия
              заключается в том, что он всё таки работает по определенным
              алгоритмам.
            </p>
            <p className="text-dark mb-4">
              Если поменяются алгоритмы на Авито, то Проныра просто об этом
              сообщит и уйдет отдыхать на некоторое время. Ты это заметишь и я
              это замечу. Пока он будет отдыхать, как правило, это не более 1 го
              дня, мы всё сделаем. Тебе нужно просто его перезапустить заново.
              Если забыл, как это делается, глянь инструкцию.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-main mb-4">
              Делись с покупателями
            </h2>
            <p className="text-dark mb-4">
              Не бойся поделиться Пронырой с твоими покупателями. Только
              обязательно проследи, чтобы они кнопнули именно частное лицо. Им
              будет другая оплата, тебе другая премия.
            </p>
            <p className="text-dark mb-4">
              Почему не бойся? Ты профи и в потоке этой информации, как рыба в
              воде, твой покупатель в этом не особо разбирается. Он пройдет
              через 4 стадии:
            </p>
            <ol className="list-decimal pl-6 text-dark space-y-2">
              <li>Первая – я супер герой</li>
              <li>Вторая – что-то пошло не так</li>
              <li>Третья – паника</li>
              <li>Четвертая – где мой риэлтор?</li>
            </ol>
            <p className="text-dark mt-4 mb-4">
              Это уже проверено и неоднократно )) Теперь угадай к кому он
              вернется? Верно, именно к тебе. Ты же ему показал этот путь, а
              человек всегда хочет вернуть долг. Мы так устроены. Это даже
              Чалдини описал в своей книге «Психология влияния», правило
              взаимного обмена. Кстати очень рекомендую к прочтению.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-main mb-4">
              Предложения по улучшению
            </h2>
            <p className="text-dark">
              Если у тебя есть какая-то идея, или предложение, как можно
              улучшить, или дополнить Проныру, просто свяжись с создателем.
              Кнопка в твоём личном кабинете. Кто знает, может именно твоя идея
              будет революционной и ты станешь партнёром.
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

export default ReadmePage;
