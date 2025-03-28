import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createUser } from "@/http/api.js";
import useTokenStore from "@/http/store";
import { useMutation} from '@tanstack/react-query'

export default function Register() {
  // If localStorage contains a user, redirect to homepage
  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/";
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [error, setError] = useState("");

  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      console.log('register success')
      console.log(response.data.token)
        // register mutation missing credentials like email , phone etc
      setToken(response.data.token)
    },
  })

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Background logic for registration:
    // Replace this with your API call or registration logic.
    console.log("Registering user:", { name, email, password, role });
    mutation.mutate({ name, email,phone, password, role });
    
    // Optionally, after successful registration, set the user in localStorage
    // and redirect to the homepage.
    localStorage.setItem("user", email);
    window.location.href = "/";
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

       
        <div>
          <Input
            type="phone number"
            placeholder="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <fieldset className="space-y-2">
          <legend className="font-medium text-center block">Role</legend>
          <div className="flex justify-center space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="farmer"
                checked={role === "farmer"}
                onChange={() => setRole("farmer")}
                className="h-4 w-4 text-blue-600"
              />
              <span>Farmer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="vendor"
                checked={role === "vendor"}
                onChange={() => setRole("vendor")}
                className="h-4 w-4 text-blue-600"
              />
              <span>Vendor</span>
            </label>
          </div>
        </fieldset>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
}
