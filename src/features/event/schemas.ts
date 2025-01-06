import * as Yup from "yup";

export const createTransactionSchema = (userPoints: number) =>
  Yup.object({
    tickets: Yup.array().of(
      Yup.object({
        ticketTypeId: Yup.number().required(),
        quantity: Yup.number().min(0, "Cannot be negative"),
      }),
    ),
    pointsUsed: Yup.number()
      .min(0, "Cannot use negative points")
      .max(userPoints, "Cannot use more points than available"),
    voucherId: Yup.string(),
  });
