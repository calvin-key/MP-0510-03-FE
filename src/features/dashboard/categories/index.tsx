"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CategoryFormValues, CategorySchema } from "./schemas";

interface Category {
  id: string;
  name: string;
  description: string;
  eventsCount: number;
  createdAt: string;
}

const sampleCategories: Category[] = [
  {
    id: "1",
    name: "Music Festivals",
    description: "Live music events featuring multiple artists",
    eventsCount: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tech Conferences",
    description: "Professional technology and innovation events",
    eventsCount: 8,
    createdAt: "2024-01-20",
  },
];

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      // Add your category creation/editing logic here
      console.log("Form submitted:", values);
      setIsDialogOpen(false);
      formik.resetForm();
      setEditingCategory(null);
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

  const filteredCategories = sampleCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            <Button className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transition-all hover:from-orange-600 hover:to-orange-700">
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
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md transition-all hover:from-orange-600 hover:to-orange-700"
              >
                {editingCategory ? "Save Changes" : "Create Category"}
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
            All Categories{" "}
            <Badge variant="secondary" className="ml-2">
              {sampleCategories.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
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
                      <Badge variant="secondary" className="font-normal">
                        {category.eventsCount} events
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
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
                  <TableCell colSpan={5} className="text-center">
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
