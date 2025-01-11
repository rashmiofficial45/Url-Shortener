import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SignUp from "./SignUp"
import Login from "./Login"

const Auth = () => {
  return (
        <Tabs
      defaultValue="login"
      className="w-full my-36 max-w-md mx-auto sm:w-[400px] px-4"
    >
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="text-left">
        <Login />
      </TabsContent>
      <TabsContent value="signup" className="text-left">
        <SignUp />
      </TabsContent>
    </Tabs>
  )
}

export default Auth
