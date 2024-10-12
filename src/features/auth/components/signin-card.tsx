import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGit, FaGithub } from "react-icons/fa";

const SignInCard = () => {
  return (
    <Card className="size-full border-none shadow-none md:w-[486px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text=2xl">Welcome Back</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <form className="space-y-4">
          <Input
            required
            type="email"
            value={""}
            onChange={() => {}}
            placeholder="Enter your email address"
            disabled={false}
          />
          <Input
            required
            type="password"
            value={""}
            onChange={() => {}}
            placeholder="Enter your password"
            disabled={false}
            min={8}
            max={256}
          />
          <Button disabled={false} type="submit" size="lg" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button
          variant={"secondary"}
          size="lg"
          className="w-full"
          disabled={false}
        >
          <FcGoogle size={24} className="mr-2" />
          Login with Google
        </Button>
        <Button
          variant={"secondary"}
          size="lg"
          className="w-full"
          disabled={false}
        >
          <FaGithub size={24} className="mr-2" />
          Login with Github
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
