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
    duration: 30,
  });

  // New plan form state
  const [newPlan, setNewPlan] = useState({
    duration: 30,
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
      duration: plan.duration || 30,
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

    if (newPlan.duration < 1) {
      errors.duration = "Длительность должна быть не менее 1 дня";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await createPlanMutation.mutateAsync({
        duration: newPlan.duration,
      });
      setIsNewPlanDialogOpen(false);
      // Reset form
      setNewPlan({
        duration: 30,
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

  const handleFormChange = (field: string, value: number) => {
    setEditForm({
      ...editForm,
      [field]: value,
    });
  };

  const handleNewPlanChange = (field: string, value: number) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">ID</h3>
                <p>{currentFreePlan.id}</p>
              </div>
              <div>
                <h3 className="font-medium">Длительность</h3>
                <p>{currentFreePlan.duration} дней</p>
              </div>
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
                <TableHead>Длительность</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {freePlans?.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell>{plan.duration} дней</TableCell>
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
                Изменение длительности бесплатного плана
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan-duration" className="text-right">
                  Длительность (дни)
                </Label>
                <Input
                  id="plan-duration"
                  type="number"
                  min="1"
                  value={editForm.duration}
                  onChange={(e) =>
                    handleFormChange("duration", Number(e.target.value))
                  }
                  className="col-span-3"
                />
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
              Укажите длительность нового бесплатного плана
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-plan-duration" className="text-right">
                Длительность (дни)
              </Label>
              <div className="col-span-3">
                <Input
                  id="new-plan-duration"
                  type="number"
                  min="1"
                  value={newPlan.duration}
                  onChange={(e) =>
                    handleNewPlanChange("duration", Number(e.target.value))
                  }
                  className={formErrors.duration ? "border-red-500" : ""}
                />
                {formErrors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.duration}
                  </p>
                )}
              </div>
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
