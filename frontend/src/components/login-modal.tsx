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

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", username);
    window.location.reload();
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
