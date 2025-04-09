import * as z from "zod"

export const LoginSchema = z.object({
    emailAddress: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const OTPSchema = z.object({
    otp: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


export const RegisterSchema = z.object({
    firstName: z.string().min(4, {
        message: "Please Enter Your First Name"
    }),
    lastName: z.string().min(4, {
        message: "Please Enter Your Last Name"
    }),
    emailAddress: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine(
            (password) => /[A-Z]/.test(password),
            { message: "Password must contain at least one uppercase letter" }
        )
        .refine(
            (password) => /[0-9]/.test(password),
            { message: "Password must contain at least one number" }
        )
        .refine(
            (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            { message: "Password must contain at least one special character" }
        ),
    phoneNumber: z.string().min(6, {
        message: "Number must be accurate"
    }),
    countryOfResidence: z.string().min(3, {
        message: "Country of residence must be at least 3 characters long"
    })
})