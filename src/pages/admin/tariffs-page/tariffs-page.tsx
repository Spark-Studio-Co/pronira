"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Loader2 } from "lucide-react";
import {
  useGetTariffs,
  useGetTariffsWithUserCount,
  useUpdateTariff,
  useCreateTariff,
} from "@/entities/tariffs/hooks/use-tariffs";

export default function TariffsPageAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewTariffDialogOpen, setIsNewTariffDialogOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<any>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [subscriptionTime, setSubscriptionTime] = useState<number>(30);
  const [isActive, setIsActive] = useState<boolean>(true);

  // New tariff form state
  const [newTariff, setNewTariff] = useState({
    title: "",
    price: 0,
    subscriptionTime: 30, // Default to 30 days
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch tariffs data
  const { data: tariffs, isLoading: isLoadingTariffs } = useGetTariffs();
  const { data: tariffsWithUsers, isLoading: isLoadingTariffsWithUsers } =
    useGetTariffsWithUserCount();

  // Update tariff mutation
  const updateTariffMutation = useUpdateTariff();

  // Create tariff mutation
  const createTariffMutation = useCreateTariff();

  const handleEditTariff = (tariff: any) => {
    setSelectedTariff(tariff);
    setNewPrice(tariff.price);
    setSubscriptionTime(tariff.subscriptionTime || 30);
    setIsActive(true); // Assuming all fetched tariffs are active
    setIsDialogOpen(true);
  };

  const handleUpdateTariff = async () => {
    if (!selectedTariff) return;

    try {
      await updateTariffMutation.mutateAsync({
        id: selectedTariff.id,
        data: {
          price: newPrice,
          subscriptionTime: subscriptionTime,
        },
      });

      setIsDialogOpen(false);
    } catch (error) {}
  };

  const handleCreateTariff = async () => {
    // Validate form
    const errors: Record<string, string> = {};

    if (!newTariff.title) {
      errors.title = "Название тарифа обязательно";
    }

    if (!newTariff.price || newTariff.price < 1) {
      errors.price = "Стоимость должна быть больше 0";
    }

    if (!newTariff.subscriptionTime || newTariff.subscriptionTime < 1) {
      errors.subscriptionTime = "Срок подписки должен быть больше 0 дней";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createTariffMutation.mutateAsync(newTariff);
      setIsNewTariffDialogOpen(false);
      // Reset form
      setNewTariff({
        title: "",
        price: 0,
        subscriptionTime: 30,
      });
      setFormErrors({});
    } catch (error) {
      console.error("Failed to create tariff:", error);
    }
  };

  const handleNewTariffChange = (field: string, value: string | number) => {
    setNewTariff({
      ...newTariff,
      [field]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[field]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[field];
      setFormErrors(updatedErrors);
    }
  };

  if (isLoadingTariffs || isLoadingTariffsWithUsers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Загрузка тарифов...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Тарифы</h2>
        </div>
        <Button onClick={() => setIsNewTariffDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить тариф
        </Button>
      </div>

      <Tabs defaultValue="tariffs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tariffs">Тарифы</TabsTrigger>
          <TabsTrigger value="tariffs-with-users">
            Тарифы с пользователями
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tariffs" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tariffs?.map((tariff) => (
              <Card key={tariff.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{tariff.title}</CardTitle>
                    <Badge className="bg-green-500">Активен</Badge>
                  </div>
                  <CardDescription>
                    ₽{tariff.price} за {tariff.subscriptionTime || 30} дней
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTariff(tariff)}
                    >
                      Редактировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tariffs-with-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Тарифы с количеством пользователей</CardTitle>
              <CardDescription>
                Статистика по количеству пользователей на каждом тарифе
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тариф</TableHead>
                    <TableHead>Стоимость (₽)</TableHead>
                    <TableHead>Срок подписки (дни)</TableHead>
                    <TableHead>Количество пользователей</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tariffsWithUsers?.map((tariff) => (
                    <TableRow key={tariff.id}>
                      <TableCell>{tariff.id}</TableCell>
                      <TableCell className="font-medium">
                        {tariff.title}
                      </TableCell>
                      <TableCell>{tariff.price}</TableCell>
                      <TableCell>
                        {tariff.subscriptionTime || 30} дней
                      </TableCell>
                      <TableCell>{tariff.usersCount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditTariff(tariff)}
                        >
                          Редактировать
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Tariff Dialog */}
      {selectedTariff && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Редактировать тариф</DialogTitle>
              <DialogDescription>
                Изменение настроек тарифа {selectedTariff.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tariff-title" className="text-right">
                  Название
                </Label>
                <Input
                  id="tariff-title"
                  defaultValue={selectedTariff.title}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tariff-price" className="text-right">
                  Стоимость (₽)
                </Label>
                <Input
                  id="tariff-price"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="tariff-subscription-time"
                  className="text-right"
                >
                  Срок подписки (дни)
                </Label>
                <Input
                  id="tariff-subscription-time"
                  type="number"
                  min="1"
                  value={subscriptionTime}
                  onChange={(e) => setSubscriptionTime(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Статус</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="tariff-active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    disabled
                  />
                  <Label htmlFor="tariff-active">
                    {isActive ? "Активен" : "Неактивен"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleUpdateTariff}
                disabled={updateTariffMutation.isPending}
              >
                {updateTariffMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Сохранить изменения
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Tariff Dialog */}
      <Dialog
        open={isNewTariffDialogOpen}
        onOpenChange={setIsNewTariffDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить новый тариф</DialogTitle>
            <DialogDescription>
              Заполните форму для создания нового тарифа
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-title" className="text-right">
                Название
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-tariff-title"
                  value={newTariff.title}
                  onChange={(e) =>
                    handleNewTariffChange("title", e.target.value)
                  }
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-price" className="text-right">
                Стоимость (₽)
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-tariff-price"
                  type="number"
                  min="1"
                  value={newTariff.price}
                  onChange={(e) =>
                    handleNewTariffChange("price", Number(e.target.value))
                  }
                  className={formErrors.price ? "border-red-500" : ""}
                />
                {formErrors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.price}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-time" className="text-right">
                Срок подписки (дни)
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-tariff-time"
                  type="number"
                  min="1"
                  value={newTariff.subscriptionTime}
                  onChange={(e) =>
                    handleNewTariffChange(
                      "subscriptionTime",
                      Number(e.target.value)
                    )
                  }
                  className={
                    formErrors.subscriptionTime ? "border-red-500" : ""
                  }
                />
                {formErrors.subscriptionTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.subscriptionTime}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateTariff}
              disabled={createTariffMutation.isPending}
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
