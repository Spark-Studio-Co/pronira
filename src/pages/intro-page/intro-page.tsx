import image from "/main.png";
import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

import intro_bg from "/intro_bg.png";

export const IntroPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <img src={intro_bg} className="hidden lg:block absolute top-0" />
      <div className="z-50 flex justify-between w-full lg:flex-row">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-[24px] lg:text-[40px] 2xl:text-[44px] lg:max-w-[710px] lg:text-left text-center font-bold">
            Добро пожаловать (fixed)
            <br />в приложение «Проныра»! 🧞‍♂️✨
          </h1>
          <img
            src={image}
            alt="Main Image"
            className="w-[350px] h-[367.5px] mt-8 lg:hidden"
          />
          <span className="text-main text-[32px] font-medium lg:hidden">
            Привет!
          </span>
          <p className="text-black text-[16px] text-center font-medium mt-4 lg:text-[17px] lg:text-left lg:font-[400] lg:mt-8 lg:leading-6 lg:max-w-[552px]">
            Меня зовут Джин. я твой поисковый артефакт Я знаю, ты занимаешься
            недвижимостью, иначе тебя бы здесь не было. <br />
            После нашего знакомства я открою тебе свою сокровищницу и сделаю
            так, что о новых объектах ты будешь узнавать один из первых. Ну что,
            жми на лампу и давай потанцуем
          </p>
          <Button
            onClick={() => navigation("/registration")}
            text="Продолжить"
            variant="primary"
            className="mt-8 mb-8 lg:max-w-[382px]"
            isLamp
          />
        </div>
        <img
          src={image}
          alt="Main Image"
          className="w-[571px] h-[600px] lg:flex hidden"
        />
      </div>
    </Layout>
  );
};
