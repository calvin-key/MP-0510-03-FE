"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import CategoriesForm from "./components/CategoriesForm";
import TicketType from "./components/TicketType";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
});

const predefinedCities = ["Jakarta", "Yogyakarta", "Bali", "Bandung"];

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      address: "",
      specificLocation: "",
      startDate: "",
      endDate: "",
      city: "",
      image: null,
      ticketTypes: [{ ticketType: "", price: "", availableSeats: "" }],
      categories: [""],
    },
    onSubmit: async (values) => {
      try {
        const {
          name,
          category,
          description,
          address,
          specificLocation,
          startDate,
          endDate,
          city,
          image,
          ticketTypes,
          categories,
        } = values;

        const formattedTicketTypes = ticketTypes.map((ticket) => ({
          ticketType: ticket.ticketType,
          price: parseFloat(ticket.price),
          availableSeats: parseInt(ticket.availableSeats, 10),
        }));

        const payload = {
          name,
          category,
          description,
          address,
          specificLocation,
          startDate,
          endDate,
          city,
          image,
          ticketTypes: formattedTicketTypes,
          categories,
        };

        console.log("Payload to API:", payload);

        const response = await createEvent(payload);

        console.log("API Response:", response);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("image", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setSelectedImage("");
    if (imageRef.current) imageRef.current.value = "";
  };

  return (
    <main className="container mx-auto my-10 space-y-6 px-5">
      <h1 className="text-center text-3xl font-bold">Create An Event</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-3">
        <h2 className="text-lg font-semibold">Event Details</h2>
          {/* Event Title */}
          <div>
            <Label htmlFor="name">Event Title</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter event title"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Event Date */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <p className="text-xs text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <p className="text-xs text-red-500">{formik.errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div>
            <RichTextEditor
              label="Description"
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              isTouch={formik.touched.description}
              setError={formik.setFieldError}
              setTouch={formik.setFieldTouched}
            />
          </div>

          {/* Event Image */}
          <div>
            <Label>Event Image</Label>
            {selectedImage ? (
              <div className="space-y-3">
                <Image
                  src={selectedImage}
                  alt="Selected Event"
                  className="h-40 w-52 object-cover"
                  width={200}
                  height={150}
                />
                <Button variant="destructive" onClick={removeImage}>
                  Remove Image
                </Button>
              </div>
            ) : (
              <Input
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={onChangeImage}
              />
            )}
            {formik.touched.image && formik.errors.image && (
              <p className="text-xs text-red-500">{formik.errors.image}</p>
            )}
          </div>
        </div>

        {/* Event Address */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Event Address</h2>
          <div>
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="e.g. St. Coral"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-xs text-red-500">{formik.errors.address}</p>
            )}
          </div>
          <div>
            <Label htmlFor="specificLocation">Specific Location</Label>
            <Input
              id="specificLocation"
              name="specificLocation"
              type="text"
              placeholder="Building, Park, etc."
              value={formik.values.specificLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.specificLocation &&
              formik.errors.specificLocation && (
                <p className="text-xs text-red-500">
                  {formik.errors.specificLocation}
                </p>
              )}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("city", value)}
              value={formik.values.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a City" />
              </SelectTrigger>
              <SelectContent>
                {predefinedCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.city && formik.errors.city && (
              <p className="text-xs text-red-500">{formik.errors.city}</p>
            )}
          </div>
        </div>

        {/* Categories */}
        <CategoriesForm
          values={formik.values.categories}
          setFieldValue={formik.setFieldValue}
        />

        {/* Ticket Type */}
        <TicketType
          values={formik.values.ticketTypes}
          setFieldValue={formik.setFieldValue}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="default"
            className="bg-orange-400 hover:bg-orange-600"
            disabled={isPending}
          >
            {isPending ? "Creating Event..." : "Create Event"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateEventPage;
