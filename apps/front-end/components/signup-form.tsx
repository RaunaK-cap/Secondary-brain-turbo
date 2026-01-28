"use client"
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
import { api } from "@/lib/api"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const [ firstname ,setfirstname ] = useState("")
  const [ lastname , setlastname] = useState("")
  const [ password , setpassword ] = useState("")
  const [ username , setusername] = useState("")
  const router = useRouter()


  async function handlesubmit(e:React.FormEvent){
    e.preventDefault()
      try {
        const responses = await api.post("/login/v1/signup" , {
            firstname:firstname,
            lastname:lastname,
            username:username,
            password:password
        } )

        console.log(responses)
        alert("Signup successful!")
        router.push("/login")
      } catch (error: unknown) {
        console.error(error)
        if (axios.isAxiosError(error)) {
          const data = error.response?.data as unknown
          const message =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
              ? (data as { message: string }).message
              : "Something went wrong"

          alert(`Error: ${message}`)
          return
        }

        alert("Network error or server not reachable")
      }


  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlesubmit} >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">FirstName</FieldLabel>
              <Input id="firstname" type="text" placeholder="John Doe" required onChange={(e)=> setfirstname(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">lastname</FieldLabel>
              <Input id="lastname" type="text" placeholder="John Doe" required onChange={(e)=> setlastname(e.target.value)} />
            </Field>
           
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="sexy@6969" required onChange={(e)=> setusername(e.target.value)} />
              <FieldDescription>
                Must be at more than 5 characters long.
              </FieldDescription>
            </Field>

             <Field>
              <FieldLabel htmlFor="password">password</FieldLabel>
              <Input id="password" type="password" required onChange={(e)=> setpassword(e.target.value)} />
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
