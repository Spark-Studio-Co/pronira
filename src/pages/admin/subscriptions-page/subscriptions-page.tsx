"use client";

import { useEffect, useState } from "react";
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
  useCreateTariff,
  useGetTariffs,
  useGetTariffsWithUserCount,
  useUpdateTariff,
} from "@/entities/tariffs/hooks/use-tariffs";

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState<number>(0);
  const [editedSubscriptionTime, setEditedSubscriptionTime] =
    useState<number>(30);

  const [newTariffTitle, setNewTariffTitle] = useState("");
  const [newTariffPrice, setNewTariffPrice] = useState<number>(0);
  const [newTariffSubscriptionTime, setNewTariffSubscriptionTime] =
    useState<number>(30);

  const { isLoading: isLoadingTariffs, error: tariffsError } = useGetTariffs();

  const {
    data: tariffsWithUsers,
    isLoading: isLoadingTariffsWithUsers,
    error: tariffsWithUsersError,
  } = useGetTariffsWithUserCount();

  const updateTariffMutation = useUpdateTariff();

  const createTariffMutation = useCreateTariff();

  const filteredTariffs =
    tariffsWithUsers?.filter((tariff) =>
      tariff.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  useEffect(() => {
    console.log(filteredTariffs);
  }, []);

  const handleEditTariff = (plan: any) => {
    setSelectedPlan(plan);
    setEditedTitle(plan.title);
    setEditedPrice(plan.price);
    setEditedSubscriptionTime(plan.subscriptionTime || 30);
    setIsEditDialogOpen(true);
  };

  const handleSaveTariff = async () => {
    if (!selectedPlan) return;

    try {
      const updateData: {
        title?: string;
        price?: number;
        subscriptionTime?: number;
      } = {};

      // Only include fields that have changed
      if (editedTitle !== selectedPlan.title) {
        updateData.title = editedTitle;
      }

      if (editedPrice !== selectedPlan.price) {
        updateData.price = editedPrice;
      }

      if (editedSubscriptionTime !== selectedPlan.subscriptionTime) {
        updateData.subscriptionTime = editedSubscriptionTime;
      }

      // Only make the API call if there are changes
      if (Object.keys(updateData).length > 0) {
        await updateTariffMutation.mutateAsync({
          id: selectedPlan.id,
          data: updateData,
        });
      }

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating tariff:", error);
    }
  };

  const handleCreateTariff = async () => {
    if (
      !newTariffTitle ||
      newTariffPrice <= 0 ||
      newTariffSubscriptionTime <= 0
    ) {
      return;
    }

    try {
      await createTariffMutation.mutateAsync({
        title: newTariffTitle,
        price: newTariffPrice,
        subscriptionTime: newTariffSubscriptionTime,
      });

      // Reset form and close dialog
      setNewTariffTitle("");
      setNewTariffPrice(0);
      setNewTariffSubscriptionTime(30);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error creating tariff:", error);
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
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить план
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tariffsWithUsers?.slice(0, 3).map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>
                Подписка на {plan.subscriptionTime || 30} дней
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">
                ₽{plan.price}
                <span className="text-sm font-normal text-muted-foreground">
                  за {plan.subscriptionTime || 30} дней
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
                onClick={() => handleEditTariff(plan)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Редактировать
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
              <TableHead>Срок подписки</TableHead>
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
                  <TableCell>{plan.subscriptionTime} дней</TableCell>
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
                        <DropdownMenuItem
                          onClick={() => handleEditTariff(plan)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Редактировать
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

      {/* Edit Tariff Dialog */}
      {selectedPlan && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Редактировать тариф</DialogTitle>
              <DialogDescription>
                Обновить информацию о тарифе.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Название:
                </Label>
                <Input
                  id="edit-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Цена:
                </Label>
                <div className="col-span-3 flex items-center">
                  <span className="mr-1">₽</span>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-subscription-time" className="text-right">
                  Срок подписки (дни):
                </Label>
                <Input
                  id="edit-subscription-time"
                  type="number"
                  min="1"
                  value={editedSubscriptionTime}
                  onChange={(e) =>
                    setEditedSubscriptionTime(Number(e.target.value))
                  }
                  className="col-span-3"
                />
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
                onClick={handleSaveTariff}
                disabled={
                  updateTariffMutation.isPending ||
                  (editedTitle === selectedPlan.title &&
                    editedPrice === selectedPlan.price &&
                    editedSubscriptionTime === selectedPlan.subscriptionTime) ||
                  !editedTitle.trim()
                }
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

      {/* Create Tariff Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавить новый тариф</DialogTitle>
            <DialogDescription>
              Создайте новый тарифный план для пользователей.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-title" className="text-right">
                Название:
              </Label>
              <Input
                id="new-title"
                value={newTariffTitle}
                onChange={(e) => setNewTariffTitle(e.target.value)}
                className="col-span-3"
                placeholder="Например: Базовый"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-price" className="text-right">
                Цена:
              </Label>
              <div className="col-span-3 flex items-center">
                <span className="mr-1">₽</span>
                <Input
                  id="new-price"
                  type="number"
                  value={newTariffPrice}
                  onChange={(e) => setNewTariffPrice(Number(e.target.value))}
                  className="flex-1"
                  placeholder="0"
                  min="1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-subscription-time" className="text-right">
                Срок подписки (дни):
              </Label>
              <Input
                id="new-subscription-time"
                type="number"
                min="1"
                value={newTariffSubscriptionTime}
                onChange={(e) =>
                  setNewTariffSubscriptionTime(Number(e.target.value))
                }
                className="col-span-3"
                placeholder="30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={createTariffMutation.isPending}
            >
              Отмена
            </Button>
            <Button
              onClick={handleCreateTariff}
              disabled={
                createTariffMutation.isPending ||
                !newTariffTitle ||
                newTariffPrice <= 0 ||
                newTariffSubscriptionTime <= 0
              }
            >
              {createTariffMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Создать тариф
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
