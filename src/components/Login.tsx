import { SendHorizonal } from "lucide-react";
import { ApolloError, useMutation } from "@apollo/client";

import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Input } from "./Input";

import LOGIN_USER from "../queries/login-user.gql";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../utils/string";
import { Alert } from "./Alert";

const DEFAULT_ERRORS = {
  email: "",
  password: "",
  form: "",
};

export const Login = ({
  setUser,
  shouldPopup = false,
}: {
  setUser: (user: any) => void;
  shouldPopup?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(shouldPopup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });
  const [login, { data, loading, error, reset }] = useMutation(LOGIN_USER);

  const validateForm = useCallback(() => {
    const errorsToSet = { ...DEFAULT_ERRORS };
    if (!email) {
      errorsToSet.email = "Email is required";
    }
    if (!password) {
      errorsToSet.password = "Password is required";
    }

    if (errorsToSet.email || errorsToSet.password) {
      setErrors(errorsToSet);
      return false;
    }

    return true;
  }, [email, password]);

  const tryLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const response = await login({
          variables: {
            email,
            password,
          },
        });

        console.log(`got token: ${response.data.loginNetwork.accessToken}`);
        localStorage.setItem("token", response.data.loginNetwork.accessToken);
        setUser(response.data.loginNetwork.member);
      } catch (error) {
        return setErrors({
          ...DEFAULT_ERRORS,
          form: (error as ApolloError).message,
        });
      }
    },
    [login, email, password, validateForm, setUser],
  );

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Alert
          className={cn({
            hidden: !errors.form,
          })}
        >
          {errors.form}
        </Alert>
        <form className="flex flex-col gap-4" onSubmit={tryLogin}>
          <div className="flex flex-col gap-2">
            <label className="text-foreground-1" htmlFor="username">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <p
              className={cn("mb-2 text-sm text-red-500", {
                hidden: !errors.email,
              })}
            >
              {errors.email}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-foreground-1" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <p
              className={cn("mb-2 text-sm text-red-500", {
                hidden: !errors.password,
              })}
            >
              {errors.password}
            </p>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm">
              <SendHorizonal className="me-2 h-4 w-4" />
              Login
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
