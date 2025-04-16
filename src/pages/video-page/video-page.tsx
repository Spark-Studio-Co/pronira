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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
            }}
          >
            <iframe
              src="https://streamable.com/e/zllsf4?autoplay=1"
              allow="fullscreen; autoplay"
              allowFullScreen
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                position: "absolute",
                left: 0,
                top: 0,
                overflow: "hidden",
              }}
            />
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
