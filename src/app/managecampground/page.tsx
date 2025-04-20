"use client";
import { useState } from "react";
import CreateCampgroundForm from "../../components/CreateCampgroundForm";
import UpdateDeleteCampground from "@/components/ManageCampground";

const CreateCampgroundPage = () => {
  const [view, setView] = useState("create");

  return (
    <div className="container mx-auto py-8 px-4 bg-green-50 flex flex-col space-y-6">
      {/* Select dropdown - top left */}
      <div className="w-full max-w-xs">
        <label className="block mb-2 text-lg text-green-700 font-semibold">Select Option</label>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full shadow"
        >
          <option value="create">Create Campground</option>
          <option value="manage">Manage Campground</option>
        </select>
      </div>

      {/* Conditional Content */}
      <div className="w-full">
        {view === "create" && <CreateCampgroundForm />}
        {view === "manage" && <UpdateDeleteCampground />}
      </div>
    </div>
  );
};

export default CreateCampgroundPage;
