import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">FirstName</FieldLabel>
              <Input id="firstname" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">lastname</FieldLabel>
              <Input id="lastname" type="text" placeholder="John Doe" required />
            </Field>
           
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="sexy@6969" required />
              <FieldDescription>
                Must be at more than 5 characters long.
              </FieldDescription>
            </Field>

             <Field>
              <FieldLabel htmlFor="password">password</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
