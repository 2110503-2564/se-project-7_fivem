import { CampgroundJson } from "../../interface";

export default async function getCampgroundsSever(): Promise<CampgroundJson> {
  console.log("getCampgrounds Backend URL:", process.env.BACKEND_URL);
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campgrounds`);
  console.log("Response status:", response);
  if (!response.ok) {
    throw new Error("Failed to fetch Campgrounds");
  }
  const data: CampgroundJson = await response.json();
  return data;
}
