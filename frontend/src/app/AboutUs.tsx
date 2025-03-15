import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RocketIcon, ScaleIcon, ShieldCheckIcon, SproutIcon } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-green-700 dark:text-green-400">
          <SproutIcon className="inline-block h-12 w-12 mr-2 text-current" />
          About KisanMandi
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Empowering farmers through transparent, technology-driven agricultural commerce
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-16">
        <Card className="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-200">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To create a fair and equitable digital marketplace where farmers can directly connect with buyers,
              ensuring optimal pricing through real-time demand-supply matching and transparent bidding systems.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <ScaleIcon className="h-8 w-8 mb-4 text-green-600 dark:text-green-400" />,
              title: "Fair Pricing Mechanism",
              desc: "Our AI-powered bidding system analyzes market trends in real-time to ensure farmers get the best possible price for their produce."
            },
            {
              icon: <ShieldCheckIcon className="h-8 w-8 mb-4 text-green-600 dark:text-green-400" />,
              title: "Transparent Process",
              desc: "Blockchain-backed transaction records provide complete transparency in pricing and bidding history."
            },
            {
              icon: <RocketIcon className="h-8 w-8 mb-4 text-green-600 dark:text-green-400" />,
              title: "Direct Connect",
              desc: "Eliminate middlemen and connect directly with verified buyers including retailers, wholesalers, and food processing companies."
            }
          ].map((feature, index) => (
            <Card key={index} className="dark:bg-gray-900 dark:border-gray-800">
              <CardHeader>
                {feature.icon}
                <CardTitle className="dark:text-gray-200">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
          Why Choose KisanMandi?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Zero Commission", desc: "No hidden charges or middlemen fees" },
            { title: "Real-time Analytics", desc: "Market trends and price predictions" },
            { title: "Quality Assurance", desc: "Verified buyers & quality certifications" },
            { title: "Logistics Support", desc: "End-to-end transportation solutions" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 border rounded-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}