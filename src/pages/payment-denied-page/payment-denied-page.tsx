import background from "/success_payment_bg.png";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";
import denied from "/payment_denied.png";

export const DeniedPyamentPage = () => {
  const navigate = useNavigate();

  return (
    // <Layout isWelcome={false} isHeading>
    <div className="flex flex-col items-center relative max-w-[90%] lg:w-[408px] mx-auto mb-20">
      <img src={background} className="absolute lg:hidden" />
      <div className="z-50 flex flex-col items-center">
        <span className="text-main text-[48px] font-bold mt-20">Упс!</span>
        <span className="text-black text-[32px] font-bold -mt-2">
          Платеж{" "}
          <span className="text-[#FF5757] text-[32px] font-bold">
            не принят
          </span>
        </span>
        <img src={denied} alt="Jin" className="w-[350px] mt-8" />
        <p className="text-center text-[20px] mt-8">
          Попробуй еще раз <br /> Введи другую карту <br /> Свяжись с создателем
        </p>
        <Button
          variant="secondary"
          className="w-full mt-8"
          text="Связаться с создателем"
        />
        <Button
          onClick={() => navigate(-1)}
          className="w-full mt-5"
          text="Eще раз"
        />
      </div>
    </div>
    // </Layout>
  );
};
