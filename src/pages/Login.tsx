import React, { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth";
import { useFetch } from "@/hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must be 25 characters or fewer" }),
});

const Login = () => {
  // State for form data and errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const navigate = useNavigate();
  const { loading, error, execute } = useFetch();
  const [searchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data using Zod schema
      const parsedData = loginSchema.parse(formData);
      console.log("Form submitted successfully:", parsedData);

      // Use `execute` from `useFetch` to handle the API call
      const response = await execute(() => login(parsedData)); // execute returns the data

      if (response) {
        console.log("Login successful:", response);
        // Optionally, store the session data (e.g., in localStorage or a context)
        localStorage.setItem("session", JSON.stringify(response.session));
        localStorage.setItem("user", JSON.stringify(response.user));

        // Redirect or navigate upon successful login
        navigate(`/dashboard?${longlink ? `createNew${longlink}` : ""}`);
      } else {
        console.error("No response received after login.");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const fieldName = error.path[0] as string; // Extract field name
          newErrors[fieldName] = error.message; // Assign error message
        });
        setErrors(newErrors);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account here. If you don’t have an account, you can
            sign up.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleLogin}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="******"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <CardFooter className="pt-3 pb-0 px-0">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader className="w-16 h-16 animate-spin text-white" />
                ) : (
                  "Submit"
                )}
              </Button>
            </CardFooter>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
