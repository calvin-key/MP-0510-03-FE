"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Category } from "@/types/event-category";
import * as Yup from "yup";
import useCreateEventCategory from "@/hooks/api/event-categories/useCreateEventcategory";
import useGetEventCategories from "@/hooks/api/event-categories/useGetEventcategories";

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { mutateAsync: createCategory, isPending } = useCreateEventCategory();
  const { data: categoriesData, isLoading } = useGetEventCategories({
    take: 10,
    page: currentPage,
    search: searchQuery,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CategorySchema,
    onSubmit: async (values) => {
      try {
        await createCategory({
          name: values.name,
          description: values.description,
        });
        setIsDialogOpen(false);
        formik.resetForm();
        setEditingCategory(null);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
  });

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    formik.setValues({
      name: category.name,
      description: category.description,
    });
    setIsDialogOpen(true);
  };

  const filteredCategories =
    categoriesData?.data.filter(
      (category) =>
        !category.isDeleted &&
        (category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())),
    ) || [];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Event Categories
          </h1>
          <p className="mt-2 text-gray-500">
            Organize and manage your event categories efficiently
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <Plus className="h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Name</label>
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g., Music Festivals"
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Describe the category..."
                  className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-sm text-red-500">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                disabled={isPending}
              >
                {isPending
                  ? "Processing..."
                  : editingCategory
                    ? "Save Changes"
                    : "Create Category"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card className="border-gray-200 shadow-md">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-medium">
            All Categories
            <Badge variant="secondary" className="ml-2">
              {categoriesData?.meta.total || 0}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {category.description}
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="hover:bg-orange-50 hover:text-orange-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <Alert className="mx-auto mt-4 max-w-md bg-gray-50">
                      <AlertDescription>
                        No categories found matching your search criteria.
                      </AlertDescription>
                    </Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
