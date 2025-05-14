"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { PlusCircle, Loader2, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useCreateFreePlan,
  useDeleteFreePlan,
  useGetCurrentFreePlan,
  useGetFreePlans,
  useUpdateFreePlan,
} from "@/entities/free-plan/use-free-plan";

export default function FreePlanPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [planToDelete, setPlanToDelete] = useState<number | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    objectsLimit: 0,
    linksLimit: 0,
    description: "",
    durationDays: 30,
    isActive: false,
  });

  // New plan form state
  const [newPlan, setNewPlan] = useState({
    title: "",
    objectsLimit: 5,
    linksLimit: 3,
    description: "",
    durationDays: 30,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch free plans data
  const { data: freePlans, isLoading: isLoadingFreePlans } = useGetFreePlans();
  const { data: currentFreePlan, isLoading: isLoadingCurrentPlan } =
    useGetCurrentFreePlan();

  // Mutations
  const updatePlanMutation = useUpdateFreePlan();
  const createPlanMutation = useCreateFreePlan();
  const deletePlanMutation = useDeleteFreePlan();

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setEditForm({
      title: plan.title,
      objectsLimit: plan.objectsLimit,
      linksLimit: plan.linksLimit || 0,
      description: plan.description || "",
      durationDays: plan.durationDays || 30,
      isActive: plan.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleUpdatePlan = async () => {
    if (!selectedPlan) return;

    try {
      await updatePlanMutation.mutateAsync({
        id: selectedPlan.id,
        data: editForm,
      });

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to update free plan:", error);
    }
  };

  const handleCreatePlan = async () => {
    // Validate form
    const errors: Record<string, string> = {};

    if (!newPlan.title) {
      errors.title = "Название плана обязательно";
    }

    if (newPlan.objectsLimit < 0) {
      errors.objectsLimit = "Лимит объектов должен быть положительным числом";
    }

    if (newPlan.linksLimit < 0) {
      errors.linksLimit = "Лимит ссылок должен быть положительным числом";
    }

    if (newPlan.durationDays < 1) {
      errors.durationDays = "Длительность должна быть не менее 1 дня";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createPlanMutation.mutateAsync(newPlan);
      setIsNewPlanDialogOpen(false);
      // Reset form
      setNewPlan({
        title: "",
        objectsLimit: 5,
        linksLimit: 3,
        description: "",
        durationDays: 30,
      });
      setFormErrors({});
    } catch (error) {
      console.error("Failed to create free plan:", error);
    }
  };

  const handleDeletePlan = async () => {
    if (!planToDelete) return;

    try {
      await deletePlanMutation.mutateAsync(planToDelete);
      setPlanToDelete(null);
    } catch (error) {
      console.error("Failed to delete free plan:", error);
    }
  };

  const handleFormChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setEditForm({
      ...editForm,
      [field]: value,
    });
  };

  const handleNewPlanChange = (field: string, value: string | number) => {
    setNewPlan({
      ...newPlan,
      [field]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[field]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[field];
      setFormErrors(updatedErrors);
    }
  };

  if (isLoadingFreePlans || isLoadingCurrentPlan) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Загрузка бесплатных планов...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Бесплатный план</h2>
          <p className="text-muted-foreground">
            Управление параметрами бесплатного плана для новых пользователей
          </p>
        </div>
        <Button onClick={() => setIsNewPlanDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Добавить план
        </Button>
      </div>

      {currentFreePlan && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Активный бесплатный план</CardTitle>
                <CardDescription>
                  Текущий план, который получают новые пользователи
                </CardDescription>
              </div>
              <Badge className="bg-green-500">Активен</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium">Название</h3>
                <p>{currentFreePlan.title}</p>
              </div>
              <div>
                <h3 className="font-medium">Лимит объектов</h3>
                <p>{currentFreePlan.objectsLimit}</p>
              </div>
              <div>
                <h3 className="font-medium">Лимит ссылок</h3>
                <p>{currentFreePlan.linksLimit}</p>
              </div>
              <div>
                <h3 className="font-medium">Длительность</h3>
                <p>{currentFreePlan.durationDays} дней</p>
              </div>
              {currentFreePlan.description && (
                <div className="md:col-span-2">
                  <h3 className="font-medium">Описание</h3>
                  <p>{currentFreePlan.description}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => handleEditPlan(currentFreePlan)}
              >
                Редактировать
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Все бесплатные планы</CardTitle>
          <CardDescription>
            История всех бесплатных планов в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Лимит объектов</TableHead>
                <TableHead>Лимит ссылок</TableHead>
                <TableHead>Длительность</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {freePlans?.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell className="font-medium">{plan.title}</TableCell>
                  <TableCell>{plan.objectsLimit}</TableCell>
                  <TableCell>{plan.linksLimit}</TableCell>
                  <TableCell>{plan.durationDays} дней</TableCell>
                  <TableCell>
                    {plan.isActive ? (
                      <Badge className="bg-green-500">Активен</Badge>
                    ) : (
                      <Badge variant="outline">Неактивен</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPlan(plan)}
                      >
                        Редактировать
                      </Button>

                      <AlertDialog
                        open={planToDelete === plan.id}
                        onOpenChange={(open: any) => {
                          if (!open) setPlanToDelete(null);
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setPlanToDelete(plan.id)}
                            disabled={plan.isActive}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить план?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы уверены, что хотите удалить этот бесплатный
                              план? Это действие нельзя отменить.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeletePlan}>
                              {deletePlanMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Удалить"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Plan Dialog */}
      {selectedPlan && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Редактировать бесплатный план</DialogTitle>
              <DialogDescription>
                Изменение настроек бесплатного плана {selectedPlan.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-title" className="text-right">
                  Название
                </Label>
                <Input
                  id="plan-title"
                  value={editForm.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-objects-limit" className="text-right">
                  Лимит объектов
                </Label>
                <Input
                  id="plan-objects-limit"
                  type="number"
                  min="0"
                  value={editForm.objectsLimit}
                  onChange={(e) =>
                    handleFormChange("objectsLimit", Number(e.target.value))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-links-limit" className="text-right">
                  Лимит ссылок
                </Label>
                <Input
                  id="plan-links-limit"
                  type="number"
                  min="0"
                  value={editForm.linksLimit}
                  onChange={(e) =>
                    handleFormChange("linksLimit", Number(e.target.value))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-duration" className="text-right">
                  Длительность (дни)
                </Label>
                <Input
                  id="plan-duration"
                  type="number"
                  min="1"
                  value={editForm.durationDays}
                  onChange={(e) =>
                    handleFormChange("durationDays", Number(e.target.value))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="plan-description" className="text-right pt-2">
                  Описание
                </Label>
                <Textarea
                  id="plan-description"
                  value={editForm.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Статус</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="plan-active"
                    checked={editForm.isActive}
                    onCheckedChange={(checked) =>
                      handleFormChange("isActive", checked)
                    }
                  />
                  <Label htmlFor="plan-active">
                    {editForm.isActive ? "Активен" : "Неактивен"}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleUpdatePlan}
                disabled={updatePlanMutation.isPending}
              >
                {updatePlanMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Сохранить изменения
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Plan Dialog */}
      <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить новый бесплатный план</DialogTitle>
            <DialogDescription>
              Заполните форму для создания нового бесплатного плана
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-plan-title" className="text-right">
                Название
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-plan-title"
                  value={newPlan.title}
                  onChange={(e) => handleNewPlanChange("title", e.target.value)}
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
              <Label htmlFor="new-plan-objects-limit" className="text-right">
                Лимит объектов
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-plan-objects-limit"
                  type="number"
                  min="0"
                  value={newPlan.objectsLimit}
                  onChange={(e) =>
                    handleNewPlanChange("objectsLimit", Number(e.target.value))
                  }
                  className={formErrors.objectsLimit ? "border-red-500" : ""}
                />
                {formErrors.objectsLimit && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.objectsLimit}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-plan-links-limit" className="text-right">
                Лимит ссылок
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-plan-links-limit"
                  type="number"
                  min="0"
                  value={newPlan.linksLimit}
                  onChange={(e) =>
                    handleNewPlanChange("linksLimit", Number(e.target.value))
                  }
                  className={formErrors.linksLimit ? "border-red-500" : ""}
                />
                {formErrors.linksLimit && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.linksLimit}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-plan-duration" className="text-right">
                Длительность (дни)
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-plan-duration"
                  type="number"
                  min="1"
                  value={newPlan.durationDays}
                  onChange={(e) =>
                    handleNewPlanChange("durationDays", Number(e.target.value))
                  }
                  className={formErrors.durationDays ? "border-red-500" : ""}
                />
                {formErrors.durationDays && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.durationDays}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="new-plan-description" className="text-right pt-2">
                Описание
              </Label>
              <Textarea
                id="new-plan-description"
                value={newPlan.description}
                onChange={(e) =>
                  handleNewPlanChange("description", e.target.value)
                }
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreatePlan}
              disabled={createPlanMutation.isPending}
            >
              {createPlanMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Создать план
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
