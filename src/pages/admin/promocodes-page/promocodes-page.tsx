"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Search,
  Loader2,
  MoreHorizontal,
  Plus,
  Tag,
  Percent,
} from "lucide-react";
import { useGetPromocodes } from "@/entities/promocode/hooks/queries/use-get-promocodes.query";
import { useCreatePromocode } from "@/entities/promocode/hooks/mutations/use-create-promocode.mutation";

// Form schema for creating a promocode
const formSchema = z.object({
  code: z
    .string()
    .min(3, { message: "Код должен содержать минимум 3 символа" })
    .max(20, { message: "Код должен содержать максимум 20 символов" })
    .regex(/^[A-Z0-9]+$/, {
      message: "Код должен содержать только заглавные буквы и цифры",
    }),
  discount: z
    .number()
    .min(1, { message: "Скидка должна быть минимум 1%" })
    .max(100, { message: "Скидка не может превышать 100%" }),
  maxUsage: z
    .number()
    .min(1, { message: "Максимальное использование должно быть минимум 1" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PromocodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: promocodes, isLoading, error } = useGetPromocodes();
  const createPromocodeMutation = useCreatePromocode();

  // Setup form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discount: 10,
      maxUsage: 100,
    },
  });

  // Filter promocodes based on search term
  const filteredPromocodes =
    promocodes?.filter((promocode) =>
      promocode.code.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      await createPromocodeMutation.mutateAsync({
        code: values.code,
        discount: values.discount,
        maxUsage: values.maxUsage,
        usageCount: 0, // New promocodes start with 0 usage
      });

      form.reset();
      setDialogOpen(false);
    } catch (error) {}
  };

  // Calculate usage percentage
  const getUsagePercentage = (usageCount: number, maxUsage: number) => {
    return Math.round((usageCount / maxUsage) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Промокоды</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать промокод
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Создать новый промокод</DialogTitle>
              <DialogDescription>
                Заполните форму ниже для создания нового промокода. Нажмите
                "Создать" когда закончите.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Код промокода</FormLabel>
                      <FormControl>
                        <Input placeholder="SUMMER20" {...field} />
                      </FormControl>
                      <FormDescription>
                        Используйте заглавные буквы и цифры для лучшей
                        читаемости.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Скидка (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Процент скидки, который предоставляет промокод.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxUsage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Максимальное количество использований
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Сколько раз промокод может быть использован до
                        деактивации.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createPromocodeMutation.isPending}
                  >
                    {createPromocodeMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Создание...
                      </>
                    ) : (
                      "Создать"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск промокодов..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего промокодов
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promocodes?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активные промокоды
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {promocodes?.filter((p) => p.usageCount < p.maxUsage).length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Средняя скидка
            </CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {promocodes?.length
                ? Math.round(
                    promocodes.reduce((acc, promo) => acc + promo.discount, 0) /
                      promocodes.length
                  )
                : 0}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Код</TableHead>
              <TableHead>Скидка</TableHead>
              <TableHead>Использовано</TableHead>
              <TableHead>Макс. использований</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Использование</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Загрузка промокодов...
                  </div>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-red-500"
                >
                  Ошибка при загрузке промокодов: {error.message}
                </TableCell>
              </TableRow>
            ) : filteredPromocodes.length > 0 ? (
              filteredPromocodes.map((promocode) => (
                <TableRow key={promocode.id}>
                  <TableCell className="font-medium">
                    {promocode.code}
                  </TableCell>
                  <TableCell>{promocode.discount}%</TableCell>
                  <TableCell>{promocode.usageCount}</TableCell>
                  <TableCell>{promocode.maxUsage}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        promocode.usageCount < promocode.maxUsage
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {promocode.usageCount < promocode.maxUsage
                        ? "Активен"
                        : "Использован"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{
                          width: `${getUsagePercentage(
                            promocode.usageCount,
                            promocode.maxUsage
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {getUsagePercentage(
                        promocode.usageCount,
                        promocode.maxUsage
                      )}
                      %
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Открыть меню</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Промокоды не найдены.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
