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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPromocodes } from "@/entities/promocode/hooks/queries/use-get-promocodes.query";
import { useCreatePromocode } from "@/entities/promocode/hooks/mutations/use-create-promocode.mutation";
import { useDeletePromocode } from "@/entities/promocode/hooks/mutations/use-delete-promocode.mutation";
import { usePatchPromocode } from "@/entities/promocode/hooks/mutations/use-patch-promocode.mutation";

export default function PromocodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPromocode, setNewPromocode] = useState({
    code: "",
    discount: "",
    type: "percentage",
    usageLimit: "",
    expiryDate: "",
  });

  // Use React Query hooks
  const { data: promocodes = [], isLoading } = useGetPromocodes();
  const createPromocodeMutation = useCreatePromocode();
  const deletePromocodeMutation = useDeletePromocode();
  const patchPromocodeMutation = usePatchPromocode();

  const filteredPromocodes = promocodes.filter((promo) =>
    promo.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePromocodes = filteredPromocodes.filter(
    (promo) => promo.status === "Active"
  );

  const expiredPromocodes = filteredPromocodes.filter(
    (promo) => promo.status === "Expired"
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewPromocode((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setNewPromocode((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPromocode((prev) => ({ ...prev, code: result }));
  };

  const handleCreatePromocode = async (e) => {
    e.preventDefault();

    try {
      await createPromocodeMutation.mutateAsync(newPromocode as any);
      setIsCreateDialogOpen(false);

      // Reset form
      setNewPromocode({
        code: "",
        discount: "",
        type: "percentage",
        usageLimit: "",
        expiryDate: "",
      });
    } catch (error) {}
  };

  const handleDeletePromocode = async (id) => {
    try {
      await deletePromocodeMutation.mutateAsync(id);
    } catch (error) {}
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Промокоды</h2>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="mt-8 mb-8 lg:max-w-[382px]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Создать промокод
        </Button>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="all">Все промокоды</TabsTrigger>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="expired">Устаревшие</TabsTrigger>
        </TabsList>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Искать промокоды..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <TabsContent value="all" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Использование</TableHead>
                  <TableHead>Дата истечения</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Загрузка промокодов...
                    </TableCell>
                  </TableRow>
                ) : filteredPromocodes.length > 0 ? (
                  filteredPromocodes.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">
                        {promo.code}
                      </TableCell>
                      <TableCell>{promo.discount}</TableCell>
                      <TableCell>{promo.type}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            promo.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : promo.status === "Expired"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }`}
                        >
                          {promo.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {promo.usageCount}/{promo.usageLimit}
                      </TableCell>
                      <TableCell>{promo.expiryDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => copyToClipboard(promo.code)}
                            >
                              <Copy className="mr-2 h-4 w-4" />
                              Скопировать промокод
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeletePromocode(promo.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Удалить промокод
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
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Использование</TableHead>
                  <TableHead>Дата истечения</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Загрузка промокодов...
                    </TableCell>
                  </TableRow>
                ) : activePromocodes.length > 0 ? (
                  activePromocodes.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">
                        {promo.code}
                      </TableCell>
                      <TableCell>{promo.discount}</TableCell>
                      <TableCell>{promo.type}</TableCell>
                      <TableCell>
                        {promo.usageCount}/{promo.usageLimit}
                      </TableCell>
                      <TableCell>{promo.expiryDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(promo.code)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copy code</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Активные промокоды не найдены.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Код</TableHead>
                  <TableHead>Скидка</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Использование</TableHead>
                  <TableHead>Дата истечения</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Загрузка промокодов...
                    </TableCell>
                  </TableRow>
                ) : expiredPromocodes.length > 0 ? (
                  expiredPromocodes.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">
                        {promo.code}
                      </TableCell>
                      <TableCell>{promo.discount}</TableCell>
                      <TableCell>{promo.type}</TableCell>
                      <TableCell>
                        {promo.usageCount}/{promo.usageLimit}
                      </TableCell>
                      <TableCell>{promo.expiryDate}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            patchPromocodeMutation.mutate({
                              id: promo.id,
                              data: { status: "Active" },
                            });
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">Reactivate</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Устаревшие промокоды не найдены.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Создать новый промокод</DialogTitle>
            <DialogDescription>
              Создайте новый промокод для клиентов.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePromocode}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Код</FormLabel>
                <div className="col-span-3 flex gap-2">
                  <Input
                    name="code"
                    value={newPromocode.code}
                    onChange={handleInputChange}
                    placeholder="e.g. SUMMER20"
                    className="flex-1"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={generateRandomCode}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Скидка</FormLabel>
                <Input
                  name="discount"
                  value={newPromocode.discount}
                  onChange={handleInputChange}
                  placeholder="e.g. 20 or 20.00"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Тип</FormLabel>
                <Select
                  value={newPromocode.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Процент (%)</SelectItem>
                    <SelectItem value="fixed">
                      Фиксированная сумма (₽)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Лимит использования
                </FormLabel>
                <Input
                  name="usageLimit"
                  value={newPromocode.usageLimit}
                  onChange={handleInputChange}
                  type="number"
                  placeholder="e.g. 100"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Дата истечения</FormLabel>
                <Input
                  name="expiryDate"
                  value={newPromocode.expiryDate}
                  onChange={handleInputChange}
                  type="date"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                disabled={createPromocodeMutation.isPending}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={createPromocodeMutation.isPending}
              >
                {createPromocodeMutation.isPending
                  ? "Создание..."
                  : "Создать промокод"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
