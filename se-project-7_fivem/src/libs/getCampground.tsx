import { CampgroundResponse } from "../../interface";

// export default async function getCampground(
//   id: string,
// ): Promise<CampgroundResponse> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/campgrounds/${id}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         errorData.message || `HTTP error! status: ${response.status}`,
//       );
//     }
//
//     return await response.json();
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw new Error("Failed to fetch campground. Please try again later.");
//   }
// }

export default async function getCampground(
  id: string,
): Promise<CampgroundResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    console.error("Environment variable NEXT_PUBLIC_BACKEND_URL is not set.");
    throw new Error("Server configuration error.");
  }

  if (!id) {
    console.error("Campground id is missing.");
    throw new Error("Invalid campground ID.");
  }

  try {
    const response = await fetch(`${backendUrl}/api/v1/campgrounds/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch campground. Please try again later.");
  }
}
