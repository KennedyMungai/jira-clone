"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/features/auth/api/use-register";
import { signUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const SignUpCard = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: z.infer<typeof signUpSchema>) => mutate(values);

  return (
    <Card className="size-full border-none shadow-none md:w-[486px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text=2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className="cursor-pointer text-blue-700 hover:underline">
              Privacy Policy
            </span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="cursor-pointer text-blue-700 hover:underline">
              Terms of Service
            </span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              className="w-full"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button
          variant={"secondary"}
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          <FcGoogle size={24} className="mr-2" />
          Login with Google
        </Button>
        <Button
          variant={"secondary"}
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          <FaGithub size={24} className="mr-2" />
          Login with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-blue-700 hover:underline"> Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
