// import { useMutation, useQueryClient } from "react-query";
// import axios from "axios";

// const fetchProfile = async (userId: number) => {
//   const response = await axios.get(`/api/profile/${userId}`);
//   return response.data;
// };

// const updateProfile = async (userId: number, profileData: any) => {
//   const response = await axios.put(`/api/profile/${userId}`, profileData);
//   return response.data;
// };

// export const useProfile = (userId: number) => {
//   const queryClient = useQueryClient();

//   const {
//     mutate: fetchProfileData,
//     data: profile,
//     isLoading,
//     isError,
//   } = useMutation(() => fetchProfile(userId), {
//     onSuccess: (data) => {
//       queryClient.setQueryData(["profile", userId], data);
//     },
//   });

//   const { mutate: updateProfileData } = useMutation(
//     (profileData: any) => updateProfile(userId, profileData),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["profile", userId]);
//       },
//     },
//   );

//   return {
//     profile,
//     isLoading,
//     isError,
//     fetchProfileData,
//     updateProfileData,
//   };
// };
