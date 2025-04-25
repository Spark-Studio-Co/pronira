"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Eye, EyeOff, Lock } from "lucide-react";
import { useSendCode } from "@/entities/auth/hooks/mutation/use-send-reset-code.mutation";
import { useResetPassword } from "@/entities/auth/api/post/reset-password.api";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<"chatId" | "code" | "password" | "success">(
    "chatId"
  );

  const [chatId, setChatId] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { mutate: sendResetCode, isPending } = useSendCode();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChatIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatId.trim()) {
      setError("Введите Telegram chat ID");
      return;
    }

    setError("");
    sendResetCode(
      { userId: chatId },
      {
        onSuccess: () => setStep("code"),
        onError: () => setError("Ошибка при отправке кода. Проверьте chat ID."),
      }
    );
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!code.trim()) {
      setError("Введите код подтверждения");
      return;
    }

    setError("");
    setStep("password");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Пароль должен содержать не менее 8 символов");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setError("");
    resetPassword(
      {
        userId: chatId,
        resetCode: code,
        newPassword: password,
      },
      {
        onSuccess: () => setStep("success"),
        onError: () => setError("Ошибка сброса пароля. Проверьте код."),
      }
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {step === "chatId" && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Telegram ID</CardTitle>
              <CardDescription>
                Введите ваш Telegram chat ID. Мы отправим код подтверждения в
                бота.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleChatIdSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chat-id">Ваш Telegram ID</Label>
                  <Input
                    id="chat-id"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-main hover:bg-main"
                  disabled={isPending}
                >
                  {isPending ? "Отправка..." : "Получить код"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "code" && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Введите код</CardTitle>
              <CardDescription>
                Код был отправлен ботом в Telegram
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Код подтверждения</Label>
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-main hover:bg-main">
                  Продолжить
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "password" && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Сброс пароля</CardTitle>
              <CardDescription>Создайте новый пароль</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Новый пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Скрыть пароль" : "Показать пароль"}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-main hover:bg-main"
                  disabled={isResetting}
                >
                  {isResetting ? "Сброс..." : "Сохранить новый пароль"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Пароль успешно изменен
              </CardTitle>
              <CardDescription>
                Теперь вы можете войти с новым паролем
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-center text-muted-foreground mb-4">
                Ваш пароль был сброшен.
              </p>
              <Button className="w-full" onClick={() => navigate("/login")}>
                Перейти на страницу входа
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
