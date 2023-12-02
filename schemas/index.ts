import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Email must be a valid email" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string({
        required_error: "Password confirmation is required",
        invalid_type_error: "Password confirmation must be a string",
      })
      .min(8, {
        message: "Password confirmation must be at least 8 characters long",
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The password and confirm password fields must match.",
        path: ["confirmPassword"],
      });
    }
  });

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const HostHomeSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10, { message: "Description must be at least 10 characters long" }),
  type: z
    .string({
      required_error: "Type is required",
      invalid_type_error: "Type must be a string",
    })
    .min(1, { message: "Please select a type." }),
  images: z.array(z.string({ required_error: "Image is required" })).min(1, {
    message: "At least one image is required",
  }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(1, { message: "Price must be at least 1" }),
  guests: z
    .number({
      required_error: "Guests is required",
      invalid_type_error: "Guests must be a number",
    })
    .min(1, { message: "Guests must be at least 1" }),
  rooms: z
    .number({
      required_error: "Rooms is required",
      invalid_type_error: "Rooms must be a number",
    })
    .min(1, { message: "Rooms must be at least 1" }),
  bathrooms: z
    .number({
      required_error: "Baths is required",
      invalid_type_error: "Baths must be a number",
    })
    .min(1, { message: "Baths must be at least 1" }),
  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(10, { message: "Address must be at least 10 characters long" }),
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .min(3, { message: "City must be at least 3 characters long" }),
  country: z.object({
    value: z.string({ required_error: "Country is required" }),
    label: z.string(),
    flag: z.string(),
    latlang: z.array(z.number()),
    region: z.string(),
  }),
});

export const BookingSchema = z.object({
  totalPrice: z
    .number({
      required_error: "Total price is required",
      invalid_type_error: "Total price must be a number",
    })
    .min(1, { message: "Total price must be at least 1" }),
  checkIn: z
    .string({
      required_error: "Check in date is required",
      invalid_type_error: "Check in date must be a string",
    })
    .min(10, { message: "Check in date must be at least 10 characters long" }),
  checkOut: z
    .string({
      required_error: "Check out date is required",
      invalid_type_error: "Check out date must be a string",
    })
    .min(10, {
      message: "Check out date must be at least 10 characters long",
    }),
  listingId: z.string({
    required_error: "Listing id is required",
    invalid_type_error: "Listing id must be a string",
  }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type HostHomeSchemaType = z.infer<typeof HostHomeSchema>;
