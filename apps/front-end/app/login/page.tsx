"use client"
import React, { useState } from 'react'
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
import { api } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import axios from "axios"


const Page = () => {

  const [ username , setusername] = useState("")
  const [ password , setpassword] = useState("")
  const { login } = useAuth()
  const router = useRouter()

    async function handlesubmit(e:React.FormEvent){
      e.preventDefault()
      try {
         const responses = await api.post("/login/v1/login" , {
            username:username,
            password:password
        } )

         console.log(responses)
        const token = responses.data?.token as string | undefined
        if (!token) {
          alert("Login succeeded but token missing from response")
          return
        }
        login(token)
        router.push("/dashboard")
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
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card >
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your information below to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlesubmit}>
          <FieldGroup>
          
           
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" type="text" placeholder="sexy@6969" required onChange={(e)=> setusername(e.target.value)} />
              <FieldDescription>
                Must be at more than 5 characters long.
              </FieldDescription>
            </Field>

             <Field>
              <FieldLabel htmlFor="password">password</FieldLabel>
              <Input id="password" type="password" required onChange={(e)=>setpassword(e.target.value)} />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Login</Button>
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

export default Page
