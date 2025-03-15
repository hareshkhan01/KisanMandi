import { Card } from "@/components/ui/card";
import { Tractor, Wheat, IndianRupee, User } from "lucide-react";

export default function Counter() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Farmer Count */}
        <Card className="p-6 text-center dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-4 mx-auto text-green-600 dark:text-green-400">
            <User className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
            Registered Farmers
          </h3>
          <div className="text-3xl font-bold mb-2 text-green-600 dark:text-green-400">
            125,430+
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (and counting)
          </p>
        </Card>

        {/* Transactions */}
        <Card className="p-6 text-center dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-4 mx-auto text-blue-600 dark:text-blue-400">
            <Tractor className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
            Daily Transactions
          </h3>
          <div className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">
            ₹2,345L
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (and counting)
          </p>
        </Card>

        {/* Produce Traded */}
        <Card className="p-6 text-center dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-4 mx-auto text-orange-600 dark:text-orange-400">
            <Wheat className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
            Produce Traded
          </h3>
          <div className="text-3xl font-bold mb-2 text-orange-600 dark:text-orange-400">
            56.7MT
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (and counting)
          </p>
        </Card>

        {/* Income Increase */}
        <Card className="p-6 text-center dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-4 mx-auto text-purple-600 dark:text-purple-400">
            <IndianRupee className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
            Avg. Income Increase
          </h3>
          <div className="text-3xl font-bold mb-2 text-purple-600 dark:text-purple-400">
            40%
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            (and counting)
          </p>
        </Card>
      </div>
    </section>
  );
}