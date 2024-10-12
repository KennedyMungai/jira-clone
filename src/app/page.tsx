import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircleIcon } from "lucide-react";

const HomePage = () => {
	return (
		<div className="space-y-4 p-4">
			<div className="space-x-4">
				<Button>Primary</Button>
				<Button variant={"secondary"}>Secondary</Button>
				<Button variant={"outline"}>Outline</Button>
				<Button variant={"destructive"}>Destructive</Button>
				<Button variant={"ghost"}>Ghost</Button>
				<Button variant={"muted"}>Muted</Button>
				<Button variant={"tertiary"}>Tertiary</Button>
			</div>
			<div className="space-x-4">
				<Button>Default</Button>
				<Button size="lg">Large</Button>
				<Button size="sm">Small</Button>
				<Button size={"xs"}>Extra Small</Button>
				<Button size="icon">
					<MessageCircleIcon />
				</Button>
			</div>
			<div>
				<Button disabled>Disabled</Button>
			</div>
			<div>
				<Input />
			</div>
		</div>
	);
};

export default HomePage;
