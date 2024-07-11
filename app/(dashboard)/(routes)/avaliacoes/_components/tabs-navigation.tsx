'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Assessment, Dialog, School, Student } from '@prisma/client'
import Answers from './answers'

export interface StudentSchool extends Student {
  school: School
}

export interface AssesmentUser extends Assessment {
  student: StudentSchool
}

interface TabsNavigationProps {
  assessment: AssesmentUser
  dialogs: Dialog[]
}

export function TabsNavigation({ assessment, dialogs }: TabsNavigationProps) {
  return (
    <Tabs defaultValue="account" className="w-full mt-10">
      <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
        <TabsTrigger value="answers">Questionário</TabsTrigger>
        <TabsTrigger value="password">Dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="answers">
        <Card>
          <CardHeader>
            <CardTitle>Questionário</CardTitle>
            <CardDescription>
              Aqui são apresentadas as respostas durante o preenchimento da
              avaliação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Answers dialogs={dialogs} assessment={assessment} />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, youll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
