import { Layout } from "@/shared/ui/layout";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router-dom";

export const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <Layout isWelcome={false} isHeading heading="Отправить платеж" isCenter>
      <div className="flex flex-col lg:items-center justify-center w-full lg:max-w-[408px] mx-auto">
        <span className="font-[400] text-black lg:text-center">
          Выбери одну или несколько категорий
        </span>
        <div className="w-full mt-8 flex flex-col gap-3">
          <Input placeholder="Квартиры" />
          <Input placeholder="Номер карты" />
          <Input placeholder="Дата" />
          <Input placeholder="Код" />
        </div>
        <span className="text-black font-bold text-[24px] mt-8 text-center">
          Итого к оплате:{" "}
          <span className="text-main font-bold text-[24px]">5.000руб.</span>
        </span>
        <Button
          onClick={() => navigate("/payment-success")}
          variant="secondary"
          className="w-full mt-8"
          text="Оплатить"
        />
      </div>
    </Layout>
  );
};
