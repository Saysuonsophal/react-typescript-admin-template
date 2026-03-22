import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
 
} from "@/components/ui/field";
import { Input } from "./ui/input";

export const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center text-left">
          <CardTitle className="text-xl">Forget Password</CardTitle>
          <CardDescription className="">
            Enter your registered email and we will send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup className="grid gap-3">
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </Field>

              {/* Submit */}
              <Field className="mt-2">
                <Button type="submit">Countinue</Button>
              </Field>

              {/* Register */}
              <FieldDescription className="text-center">
                Already have an account? <a href="/sign-in">Sign In</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};
