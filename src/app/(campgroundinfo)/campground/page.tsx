import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getCampgroundsSever from "@/libs/getCampgrundsClinent";

export default function CampgroundPage() {
  const campgrounds = getCampgroundsSever();

  return (
    <>
      <Suspense
        fallback={
          <p className="text-center">
            Loading... <LinearProgress />
          </p>
        }
      >
        <CampgroundCatalog campgroundsJson={campgrounds} />
      </Suspense>
    </>
  );
}
