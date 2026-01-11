import { z } from "zod";

/**
 * Common form validation schemas using Zod
 * These can be used with react-hook-form and @hookform/resolvers/zod
 */

// Email validation schema
export const emailSchema = z.string().email("Invalid email address");

// Password validation schema (min 8 chars, requires letter and number)
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Signup form schema
export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

// Profile update schema
export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

/**
 * Helper function to format Zod errors for display in forms
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message || "Validation error";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}

/**
 * Example usage with react-hook-form:
 * 
 * import { useForm } from "react-hook-form";
 * import { zodResolver } from "@hookform/resolvers/zod";
 * import { loginSchema, type LoginFormData } from "@/lib/form-utils";
 * 
 * const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
 *   resolver: zodResolver(loginSchema),
 * });
 * 
 * const onSubmit = async (data: LoginFormData) => {
 *   // Handle form submission
 * };
 */
