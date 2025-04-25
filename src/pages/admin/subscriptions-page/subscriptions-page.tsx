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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertCircle,
  Edit,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useGetTariffs,
  useGetTariffsWithUserCount,
  useUpdateTariffPrice,
} from "@/entities/tariffs/hooks/use-tariffs";

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [editedPrice, setEditedPrice] = useState<number>(0);

  const {
    data: tariffs,
    isLoading: isLoadingTariffs,
    error: tariffsError,
  } = useGetTariffs();
  const {
    data: tariffsWithUsers,
    isLoading: isLoadingTariffsWithUsers,
    error: tariffsWithUsersError,
  } = useGetTariffsWithUserCount();

  // Update tariff mutation
  const updateTariffMutation = useUpdateTariffPrice();

  // Filter tariffs based on search term
  const filteredTariffs =
    tariffsWithUsers?.filter((tariff) =>
      tariff.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditPrice = (plan: any) => {
    setSelectedPlan(plan);
    setEditedPrice(plan.price);
    setIsEditDialogOpen(true);
  };

  const handleSavePrice = async () => {
    if (!selectedPlan) return;

    try {
      await updateTariffMutation.mutateAsync({
        id: selectedPlan.id,
        price: editedPrice,
      });

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("error with change price", error);
    }
  };

  // Loading state
  if (isLoadingTariffs || isLoadingTariffsWithUsers) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Загрузка тарифов...</span>
      </div>
    );
  }

  // Error state
  if (tariffsError || tariffsWithUsersError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Не удалось загрузить данные о тарифах. Пожалуйста, попробуйте позже.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Подписки</h2>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Добавить план
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tariffsWithUsers?.slice(0, 3).map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>Ежемесячно</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ₽{plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /месяц
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Users className="mr-2 h-4 w-4" />
                <span>{plan.usersCount} активных пользователей</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleEditPrice(plan)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Изменить цену
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск подписок..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Активные пользователи</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTariffs.length > 0 ? (
              filteredTariffs.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell className="font-medium">{plan.title}</TableCell>
                  <TableCell>₽{plan.price}</TableCell>
                  <TableCell>{plan.usersCount}</TableCell>
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleEditPrice(plan)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Изменить цену
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" disabled>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Удалить план
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Тарифы не найдены.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedPlan && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Изменить цену</DialogTitle>
              <DialogDescription>
                Обновить цену для {selectedPlan.title}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Текущая цена:</Label>
                <div className="col-span-3 font-medium">
                  ₽{selectedPlan.price}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Новая цена:
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-1">₽</span>
                  <Input
                    id="price"
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={updateTariffMutation.isPending}
              >
                Отмена
              </Button>
              <Button
                onClick={handleSavePrice}
                disabled={updateTariffMutation.isPending}
              >
                {updateTariffMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
