"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersChart } from "@/components/statistic/users-chart";
import { PaymentsChart } from "@/components/statistic/payments-chart";
import { TariffsDistribution } from "@/components/statistic/tariffs-distribution";
import { UserActivityChart } from "@/components/statistic/user-activity-chart";

export default function StatisticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Статистика</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[13vw]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="7days">Последние 7 дней</SelectItem>
              <SelectItem value="30days">Последние 30 дней</SelectItem>
              <SelectItem value="90days">Последние 90 дней</SelectItem>
              <SelectItem value="year">Последний год</SelectItem>
              <SelectItem value="all">Все время</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="payments">Платежи</TabsTrigger>
          <TabsTrigger value="tariffs">Тарифы</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Всего пользователей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +12% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Активные пользователи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">845</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Новые пользователи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145</div>
                <p className="text-xs text-muted-foreground">
                  +18.1% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Конверсия в платящих
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68.4%</div>
                <p className="text-xs text-muted-foreground">
                  +4.3% с прошлого месяца
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Динамика пользователей</CardTitle>
                <CardDescription>
                  Количество новых и активных пользователей
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UsersChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Активность пользователей</CardTitle>
                <CardDescription>
                  Активные/неактивные пользователи
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <UserActivityChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Общий доход
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₽423,500</div>
                <p className="text-xs text-muted-foreground">
                  +18.1% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Средний чек
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₽2,450</div>
                <p className="text-xs text-muted-foreground">
                  +3.2% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Количество платежей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">173</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% с прошлого месяца
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Возвраты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₽12,500</div>
                <p className="text-xs text-muted-foreground">
                  -2.3% с прошлого месяца
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Динамика платежей</CardTitle>
                <CardDescription>
                  Доход и количество платежей по дням
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PaymentsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tariffs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Базовый тариф
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">
                  26.3% от всех пользователей
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Стандарт тариф
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456</div>
                <p className="text-xs text-muted-foreground">
                  36.9% от всех пользователей
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Премиум тариф
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">
                  19.9% от всех пользователей
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Корпоративный тариф
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65</div>
                <p className="text-xs text-muted-foreground">
                  5.3% от всех пользователей
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Распределение тарифов</CardTitle>
                <CardDescription>
                  Количество пользователей по тарифам
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <TariffsDistribution />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
