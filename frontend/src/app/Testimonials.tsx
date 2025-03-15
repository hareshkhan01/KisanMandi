import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ravi Kumar",
    role: "Farmer, Punjab",
    text: "KisanMandi transformed how I sell my crops. The transparent bidding system helped me get 20% better prices compared to traditional mandis.",
    avatar: "/ravi-avatar.jpg"
  },
  {
    id: 2,
    name: "Sunita Mehta",
    role: "Agri Trader, Maharashtra",
    text: "Real-time demand data helps me source quality produce directly from farmers. It's revolutionized our supply chain efficiency.",
    avatar: "/suneeta-avatar.jpg"
  },
  {
    id: 3,
    name: "Anil Gupta",
    role: "Food Processor, Gujarat",
    text: "The quality assurance and logistics support have reduced our operational costs by 15%. Highly recommended platform!",
    avatar: "/anil-avatar.jpg"
  }
];

export default function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Hear from farmers, traders, and agri-businesses transforming their operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id}
            className="p-6 dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <Quote className="h-8 w-8 text-green-600 dark:text-green-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {testimonial.text}
            </p>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <span className="font-medium text-green-600 dark:text-green-400">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}