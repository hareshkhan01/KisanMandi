import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Scale, LineChart, ShieldCheck, Truck } from "lucide-react";

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Revolutionizing Agricultural Trade
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Empowering farmers with transparent, technology-driven solutions for fair market access
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Scale className="h-8 w-8 text-green-600 dark:text-green-400" />
              </span>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Fair Pricing System
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AI-powered dynamic pricing based on real-time market demand and supply metrics
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <LineChart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </span>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Real-time Analytics
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Interactive dashboards with market trends and predictive pricing models
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </span>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Secure Transactions
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Blockchain-verified contracts and escrow payment protection
            </p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <div className="flex items-center gap-4">
              <span className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Truck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </span>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Logistics Support
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Integrated transportation network with quality-controlled storage facilities
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}