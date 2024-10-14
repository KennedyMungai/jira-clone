import UserButton from "@/features/auth/components/user-button";

const HomePage = () => {
  return (
    <div className="space-y-4 p-4">
      Only visible to authorized users
      <UserButton />
    </div>
  );
};

export default HomePage;
