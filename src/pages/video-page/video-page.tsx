import { Button } from "@/shared/ui/button";
import { Layout } from "@/shared/ui/layout";
import { useNavigate } from "react-router-dom";
import intro_bg from "/intro_bg.png";

export const VideoPage = () => {
  const navigation = useNavigate();

  // test test

  return (
    <Layout isWelcome>
      <img src={intro_bg} className="hidden lg:block absolute top-0" />
      <div className="z-50 flex justify-between w-[90%] m-auto lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-[24px] lg:text-[40px] 2xl:text-[44px] lg:max-w-[710px] lg:text-left text-center font-bold">
            Видео инструкция
          </h1>
          <div className="flex w-full h-full items-center justify-center">
            <iframe
              width="720"
              height="405"
              className="mt-8"
              src="https://rutube.ru/play/embed/1dd543a192c8b9cd7bc7816858a14a9f/"
              frameBorder="0"
              allow="clipboard-write; autoplay"
              webkitAllowFullScreen
              mozallowfullscreen
              allowFullScreen
            ></iframe>
          </div>
          <Button
            onClick={() => navigation("/")}
            text="Назад"
            variant="primary"
            className="mt-32 mb-8 lg:max-w-[382px]"
            isLamp
          />
        </div>
      </div>
    </Layout>
  );
};
