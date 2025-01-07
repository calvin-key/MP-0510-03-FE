import * as Yup from "yup";

export const editEventSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  specificLocation: Yup.string().required("Specific location is required"),
  locationId: Yup.number().required("Location is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date().required("End date is required"),
  categories: Yup.array()
    .of(Yup.number())
    .min(1, "At least one category is required"),
  ticketTypes: Yup.array()
    .of(
      Yup.object().shape({
        ticketType: Yup.string().required("Ticket type is required"),
        price: Yup.number()
          .min(0, "Price must be positive")
          .required("Price is required"),
        availableSeats: Yup.number()
          .min(0, "Available seats must be positive")
          .required("Available seats is required"),
      }),
    )
    .min(1, "At least one ticket type is required"),
  bankAccount: Yup.string(),
  image: Yup.mixed(),
});
