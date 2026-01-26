
import React from 'react'
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


const page = () => {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card >
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
                  Already have an account? <a href="/signup">Signup</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
      </div>
    </div>
  )
}

export default page
