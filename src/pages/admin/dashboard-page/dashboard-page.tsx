"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tag, CreditCard } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsers } from "@/entities/users/hooks/queries/use-get-users.query";
import { useGetPromocodes } from "@/entities/promocode/hooks/queries/use-get-promocodes.query";
import { useDashboardStats } from "@/entities/statistics/hooks/useStatistics";

export default function DashboardPage() {
  const { data: users, isLoading: isLoadingUsers } = useGetUsers();
  const { data: promocodes, isLoading: isLoadingPromocodes } =
    useGetPromocodes();
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats("30d");

  const activePromocodes =
    promocodes?.filter((promo) => promo.usageCount < promo.maxUsage) || [];

  const totalEarnings = 24563;

  const recentUsers = users
    ? [...users]
        .sort(
          (a, b) =>
            new Date(b.subscriptionExpiresAt || 0).getTime() -
            new Date(a.subscriptionExpiresAt || 0).getTime()
        )
        .slice(0, 5)
    : [];

  const recentPromocodes = promocodes
    ? [...promocodes]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 5)
    : [];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Статистика</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Всего пользователей
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats?.totalUsers}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Новых пользователей
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats?.newUsers}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">{stats?.conversionRate}%</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Количество работающих процессов
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingStats ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">4</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Активные промокоды
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingPromocodes ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">
                {activePromocodes.length}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Заработано по подпискам
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalEarnings.toLocaleString()} руб.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Недавние пользователи</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingUsers ? (
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {user.name || "Пользователь"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {user.subscriptionExpiresAt
                        ? formatDistanceToNow(
                            new Date(user.subscriptionExpiresAt),
                            { addSuffix: true, locale: ru }
                          )
                        : "Нет подписки"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Нет данных о пользователях
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Недавние промокоды</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingPromocodes ? (
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : recentPromocodes.length > 0 ? (
              <div className="space-y-4">
                {recentPromocodes.map((promocode) => (
                  <div key={promocode.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{promocode.code}</p>
                      <p className="text-sm text-muted-foreground">
                        {promocode.usageCount} из {promocode.maxUsage}{" "}
                        использований
                      </p>
                    </div>
                    <div className="ml-auto text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          promocode.usageCount < promocode.maxUsage
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        }`}
                      >
                        {promocode.usageCount < promocode.maxUsage
                          ? "Активен"
                          : "Ограничен"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                Нет данных о промокодах
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
