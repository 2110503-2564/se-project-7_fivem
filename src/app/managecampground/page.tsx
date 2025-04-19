"use client";
import CreateCampgroundForm from "../../components/CreateCampgroundForm";
import UpdateDeleteCampground from "@/components/ManageCampground";

const CreateCampgroundPage = () => {
  return (
    <div className="container mx-auto py-8 flex gap-8" style={{ backgroundColor: '#fffbeb' }}>
      <div className="flex-1">
        <CreateCampgroundForm />
      </div>
      <div className="flex-1">
        <UpdateDeleteCampground />
      </div>
    </div>
  );
};

export default CreateCampgroundPage;