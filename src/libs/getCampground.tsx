import { CampgroundResponse } from "../../interface";

export default async function getCampground(id: string): Promise<CampgroundResponse> {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/campgrounds/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch campground. Please try again later.');
    }
  }