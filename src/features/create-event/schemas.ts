import * as Yup from "yup";

export const createEventSchema = Yup.object({
  name: Yup.string().required("Event name is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  specificLocation: Yup.string().required("Specific location is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { startDate } = this.parent;
        return new Date(value) > new Date(startDate);
      },
    ),
  city: Yup.string().required("City is required"),
  image: Yup.mixed(),
  ticketTypes: Yup.array()
    .of(
      Yup.object({
        ticketType: Yup.string().required("Ticket type is required"),
        price: Yup.number().min(0).required("Price is required"),
        availableSeats: Yup.number()
          .min(1)
          .required("Available seats is required"),
      }),
    )
    .min(1, "At least one ticket type is required"),
  categories: Yup.array()
    .of(Yup.string().required("Category is required"))
    .min(1, "At least one category is required"),
});
