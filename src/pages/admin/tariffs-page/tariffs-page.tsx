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
import { PlusCircle } from "lucide-react";

const tariffs = [
  {
    id: "1",
    name: "Базовый",
    price: 990,
    trialPeriod: 7,
    features: [
      "Основные функции",
      "Ограниченное количество запросов",
      "Базовая поддержка",
    ],
    isActive: true,
  },
  {
    id: "2",
    name: "Стандарт",
    price: 1990,
    trialPeriod: 14,
    features: [
      "Все функции базового тарифа",
      "Расширенное количество запросов",
      "Приоритетная поддержка",
    ],
    isActive: true,
  },
  {
    id: "3",
    name: "Премиум",
    price: 3990,
    trialPeriod: 30,
    features: [
      "Все функции стандартного тарифа",
      "Неограниченное количество запросов",
      "Премиум поддержка 24/7",
      "Дополнительные интеграции",
    ],
    isActive: true,
  },
  {
    id: "4",
    name: "Корпоративный",
    price: 9990,
    trialPeriod: 30,
    features: [
      "Все функции премиум тарифа",
      "Выделенный менеджер",
      "Индивидуальные настройки",
      "API доступ",
    ],
    isActive: false,
  },
];

export default function TariffsPageAdmin() {
  const [tariffsList, setTariffsList] = useState(tariffs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewTariffDialogOpen, setIsNewTariffDialogOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState(null);

  const handleEditTariff = (tariff) => {
    setSelectedTariff(tariff);
    setIsDialogOpen(true);
  };

  const handleToggleActive = (id) => {
    setTariffsList(
      tariffsList.map((tariff) =>
        tariff.id === id ? { ...tariff, isActive: !tariff.isActive } : tariff
      )
    );
  };

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
          <TabsTrigger value="trial">Пробный период</TabsTrigger>
        </TabsList>
        <TabsContent value="tariffs" className="space-y-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {tariffsList.map((tariff) => (
              <Card
                key={tariff.id}
                className={!tariff.isActive ? "opacity-60" : ""}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{tariff.name}</CardTitle>
                    {tariff.isActive ? (
                      <Badge className="bg-green-500">Активен</Badge>
                    ) : (
                      <Badge variant="outline">Неактивен</Badge>
                    )}
                  </div>
                  <CardDescription>₽{tariff.price} / месяц</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      Пробный период: {tariff.trialPeriod} дней
                    </p>
                    <ul className="text-sm space-y-1 mt-4">
                      {tariff.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-green-500"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditTariff(tariff)}
                    >
                      Редактировать
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`active-${tariff.id}`}
                        checked={tariff.isActive}
                        onCheckedChange={() => handleToggleActive(tariff.id)}
                      />
                      <Label htmlFor={`active-${tariff.id}`}>
                        {tariff.isActive ? "Активен" : "Неактивен"}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="trial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки пробного периода</CardTitle>
              <CardDescription>
                Настройте длительность пробного периода для каждого тарифа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Тариф</TableHead>
                    <TableHead>Текущий пробный период (дни)</TableHead>
                    <TableHead>Новый пробный период (дни)</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tariffsList.map((tariff) => (
                    <TableRow key={tariff.id}>
                      <TableCell className="font-medium">
                        {tariff.name}
                      </TableCell>
                      <TableCell>{tariff.trialPeriod}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          defaultValue={tariff.trialPeriod}
                          className="w-20"
                          min="0"
                          max="90"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">Сохранить</Button>
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
                Изменение настроек тарифа {selectedTariff.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tariff-name" className="text-right">
                  Название
                </Label>
                <Input
                  id="tariff-name"
                  defaultValue={selectedTariff.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tariff-price" className="text-right">
                  Стоимость (₽)
                </Label>
                <Input
                  id="tariff-price"
                  type="number"
                  defaultValue={selectedTariff.price}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tariff-trial" className="text-right">
                  Пробный период (дни)
                </Label>
                <Input
                  id="tariff-trial"
                  type="number"
                  defaultValue={selectedTariff.trialPeriod}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Статус</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="tariff-active"
                    checked={selectedTariff.isActive}
                  />
                  <Label htmlFor="tariff-active">
                    {selectedTariff.isActive ? "Активен" : "Неактивен"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить изменения</Button>
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
            <DialogDescription>Создайте новый тарифный план</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-name" className="text-right">
                Название
              </Label>
              <Input
                id="new-tariff-name"
                placeholder="Название тарифа"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-price" className="text-right">
                Стоимость (₽)
              </Label>
              <Input
                id="new-tariff-price"
                type="number"
                placeholder="0"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-tariff-trial" className="text-right">
                Пробный период (дни)
              </Label>
              <Input
                id="new-tariff-trial"
                type="number"
                placeholder="14"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Статус</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="new-tariff-active" defaultChecked={true} />
                <Label htmlFor="new-tariff-active">Активен</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Создать тариф</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
