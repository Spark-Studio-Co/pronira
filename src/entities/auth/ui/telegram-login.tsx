// components/TelegramLoginButton.tsx
import { useEffect } from "react";

export const TelegramLoginButton = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "PROHYRABOT");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-radius", "20");
    script.setAttribute("data-request-access", "write");
    script.setAttribute(
      "data-auth-url",
      "https://xn----7sbhlqzghjcdke5k.xn--p1ai/registration"
    );

    const container = document.getElementById("tg-login-container");
    container?.appendChild(script);
  }, []);

  return <div id="tg-login-container" />;
};
