import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logIn } from "@/http/api.js";
import useTokenStore from "@/http/store";
import { useMutation} from '@tanstack/react-query'
//import { set } from "date-fns";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const setToken = useTokenStore((state) => state.setToken);
  const setRole = useTokenStore((state) => state.setRole);
  const setName = useTokenStore((state) => state.setName);
  const setUserId = useTokenStore((state) => state.setUserId);

  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: (res) => {
      console.log("login success", res.token);
      //redirect to dashboard
      setToken(res.token);
      setRole(res.role);
      setName(res.name);
      setUserId(res.userId);
      // auto reload the page after login
      window.location.href = "/";
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here, e.g., authentication call
    if (!username || !password) {
      return alert("Please enter email and password");
    }
    mutation.mutate({ email: username, password });
    console.log("Logging in with", { username, password });
    // Close the modal after login
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to log into your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <DialogFooter className="flex flex-col space-y-2">
            <Button type="submit">Login</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                window.location.href = "/register";
              }}
            >
              Register Now
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
