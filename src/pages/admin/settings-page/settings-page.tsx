"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsPageAdmin() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Настройки</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Общие</TabsTrigger>
          <TabsTrigger value="crm">Интеграция с CRM</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>
                Настройте основные параметры системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Название компании</Label>
                <Input id="company-name" defaultValue="Моя Компания" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email поддержки</Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="support@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-trial">
                  Стандартный пробный период (дни)
                </Label>
                <Input id="default-trial" type="number" defaultValue="14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Описание компании</Label>
                <Textarea
                  id="company-description"
                  defaultValue="Описание вашей компании и услуг"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Режим обслуживания</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить настройки</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="crm" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Интеграция с CRM</CardTitle>
              <CardDescription>
                Настройте интеграцию с вашей CRM системой
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crm-api-url">API URL</Label>
                <Input
                  id="crm-api-url"
                  placeholder="https://api.crm.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm-api-key">API Ключ</Label>
                <Input id="crm-api-key" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crm-webhook">Webhook URL</Label>
                <Input
                  id="crm-webhook"
                  placeholder="https://webhook.example.com/crm-events"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="crm-enabled" />
                <Label htmlFor="crm-enabled">Включить интеграцию с CRM</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-users" />
                <Label htmlFor="sync-users">
                  Синхронизировать пользователей
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sync-payments" />
                <Label htmlFor="sync-payments">Синхронизировать платежи</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить настройки CRM</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Настройте уведомления для администраторов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email для уведомлений</Label>
                <Input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@example.com"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-new-users" defaultChecked />
                <Label htmlFor="notify-new-users">
                  Уведомлять о новых пользователях
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-payments" defaultChecked />
                <Label htmlFor="notify-payments">Уведомлять о платежах</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-trial-expiry" defaultChecked />
                <Label htmlFor="notify-trial-expiry">
                  Уведомлять об окончании пробного периода
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notify-subscription-expiry" defaultChecked />
                <Label htmlFor="notify-subscription-expiry">
                  Уведомлять об окончании подписки
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Сохранить настройки уведомлений</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
