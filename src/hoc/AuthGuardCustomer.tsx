import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CustomerAuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

    if (session) {
      if (session.user.role !== "CUSTOMER") {
        toast.error("You don't have access to this page.");
        router.push("/dashboard");
      }
    }

    if (status === "loading") {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p>Loading authentication...</p>
        </div>
      );
    }

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
