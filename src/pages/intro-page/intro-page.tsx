import image from "@/assets/main.png";
import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";

export const IntroPage = () => {
  const navigation = useNavigate();

  return (
    <Layout isWelcome>
      <h1 className="text-[24px] text-center font-bold">
        Добро пожаловать в приложение «Проныра»! 🧞‍♂️✨
      </h1>
      <img
        src={image}
        alt="Main Image"
        className="w-[350px] h-[367.5px]  mt-8"
      />
      <span className="text-main text-[32px] font-medium">Привет!</span>
      <span className="text-black text-[16px] text-center font-medium mt-4">
        Меня зовут Джин. я твой поисковый артефакт Я знаю, ты занимаешься
        недвижимостью, иначе тебя бы здесь не было. <br />
        После нашего знакомства я открою тебе свою сокровищницу и сделаю так,
        что о новых объектах ты будешь узнавать один из первых. Ну что, жми на
        лампу и давай потанцуем
      </span>
      <Button
        onClick={() => navigation("/registration")}
        text="Продолжить"
        variant="primary"
        className="mt-8 mb-8"
        isLamp
      />
    </Layout>
  );
};
