import { CampgroundItem } from "../../interface";
import Link from 'next/link';
import { Button } from '@mui/material';

export default function CampgroundTable({ campgrounds }: { campgrounds: CampgroundItem[] }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campgrounds.map((cg) => (
            <tr key={cg._id}>
              <td className="px-6 py-4 whitespace-nowrap">{cg.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cg.province}, {cg.district}</td>
              <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <Link href={`/admin/campgrounds/${cg._id}/edit`}>
                  <Button variant="outlined" size="small">Edit</Button>
                </Link>
                <Button variant="outlined" color="error" size="small">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}