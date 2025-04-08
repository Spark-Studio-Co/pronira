"use client";

import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import intro_bg from "@/assets/intro_bg.png";
import jin from "@/assets/main.png";

export const IntroPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <img
        src={intro_bg || "/placeholder.svg"}
        className="hidden lg:block absolute top-0"
      />
      <div className="z-50 flex flex-col w-[90%] m-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col items-center lg:items-start px-20">
            <h1 className="text-[24px] lg:text-[40px] 2xl:text-[44px] lg:max-w-[710px] lg:text-left text-center font-bold">
              Добро пожаловать
              <br />в приложение «Проныра»!
            </h1>
            <img
              src={jin || "/placeholder.svg?height=367&width=350"}
              alt="Jin"
              className="w-[350px] h-[367.5px] mt-8 lg:hidden"
            />
            <span className="text-main text-[32px] font-medium lg:hidden">
              Привет!
            </span>
            <p className="text-black text-[16px] text-center font-medium mt-4 lg:text-[17px] lg:text-left lg:font-[400] lg:mt-8 lg:leading-6 lg:max-w-[552px]">
              Привет, я Джин исполняющий желания...
              <br />
              Ну как желания, скорее дающий возможности
            </p>
          </div>
          <img
            src={jin || "/placeholder.svg?height=600&width=571"}
            alt="Jin"
            className="w-[271px] h-[300px] mr-32 lg:flex hidden -scale-x-100"
          />
        </div>

        {/* Two Column Benefits Section */}
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-4 shadow-sm">
          {/* Left Column - For Whom */}
          <div>
            <h2 className="text-[22px] font-bold mb-6 text-left">
              Для кого создан:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Действующие риелторы, которые знают цену своему времени
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Агенты, которые только пришли в недвижимости и хотят быстрее
                  выйти на первую сделку
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Застройщики в поиске ликвидных объектов для строительства
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Флиперы, которым важна цена и локация</span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Инвесторы знающие толк в недвижимости</span>
              </li>
            </ul>
          </div>

          {/* Right Column - Benefits */}
          <div>
            <h2 className="text-[22px] font-bold mb-6 text-left">
              Что получишь:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Возможность одним из первых получать информацию о новых
                  объектах
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Первым брать объекты от собственника</span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Делать больше совместных сделок</span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Быть всегда в курсе рынка</span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Первому узнавать о новых ликвидных объектах под инвестиции
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>Выбирать лучшие предложения под застройку</span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>
                  Знать конкурентов и показать свою экспертность покупателю
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-main mr-2">•</span>
                <span>В разы проще подобирать объект под запрос</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center mt-8 mb-12">
          <Button
            onClick={() => navigation("/registration")}
            text="Попробуй! Это БЕСПЛАТНО"
            variant="primary"
            className="w-full max-w-[500px] mb-4 !rounded-md"
            isLamp
          />
          <Button
            onClick={() => navigation("/video")}
            text="Видео инструкция"
            variant="primary"
            className="w-full max-w-[500px] mb-4 !rounded-md"
            isLamp
          />
          <Link to="/login" className="w-full max-w-[500px]">
            <Button
              text="ВОЙТИ В ЛК"
              variant="primary"
              className="w-full !rounded-md"
              isLamp
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default IntroPage;
