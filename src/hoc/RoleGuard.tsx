// import LoadingSpinner from "@/components/LoadingSpinner";
// import { useAppSelector } from "@/redux/hooks";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function RoleGuard(Component: any) {
//   return function IsAuth(props: any) {
//     const { id, role } = useAppSelector((state) => state.user);
//     const router = useRouter();

//     useEffect(() => {
//       if (!id || role !== "ORGANIZER") {
//         router.push("/dashboard");
//       }
//     }, [id, role, router]);

//     if (!id || role !== "ORGANIZER") {
//       return <LoadingSpinner />;
//     }

//     return <Component {...props} />;
//   };
// }
