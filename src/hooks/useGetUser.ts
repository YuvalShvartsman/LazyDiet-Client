// import { useEffect, useState } from "react";

// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// import { User } from "../types/User";

// import { URLS } from "../axiosConfig/URLS";
// import db from "../axiosConfig/axiosInstance";

// type DecodedToken = {
//   userId: string;
// };

// function useGetUser() {
//   const [user, setUser] = useState<User>();

//   useEffect(() => {
//     const getUser = async () => {
//       const token = Cookies.get("token");
//       if (token) {
//         try {
//           const decodedToken: DecodedToken = jwtDecode(token);
//           const userId = decodedToken.userId;
//           const res = await db.get<{ user: User }>(
//             URLS.USER_BY_GOOGLE_ID + `${userId}`
//           );
//           const { user } = res.data;
//           setUser(user);
//         } catch (error) {
//           console.error("Error finding a user", error);
//         }
//       } else {
//         console.log("Token not found. Waiting for it to be set...");
//       }
//     };
//     getUser();
//   }, [Cookies.get("token")]);
//   return user;
// }

// export default useGetUser;

// unused rn
