// export default function ContactUs() {
//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//     //   <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-lg">
//     //     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//     //       Contact Us
//     //     </h2>
//     //     <p className="text-gray-600 text-center mb-6">
//     //       Have any questions or feedback? Fill out the form below and we'll get
//     //       back to you as soon as possible.
//     //     </p>

//     //     <form className="space-y-4">
//     //       <div>
//     //         <label className="block text-gray-700 font-medium mb-1">Name</label>
//     //         <input
//     //           type="text"
//     //           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//     //           placeholder="Your Name"
//     //           required
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-medium mb-1">
//     //           Email
//     //         </label>
//     //         <input
//     //           type="email"
//     //           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//     //           placeholder="Your Email"
//     //           required
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="block text-gray-700 font-medium mb-1">
//     //           Message
//     //         </label>
//     //         <textarea
//     //           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//     //           rows={4}
//     //           placeholder="Your Message"
//     //           required
//     //         ></textarea>
//     //       </div>

//     //       <button
//     //         type="submit"
//     //         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//     //       >
//     //         Send Message
//     //       </button>
//     //     </form>
//     //   </div>
//     // </div>
    
//   );
// }


import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send, CheckCircle2, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  topic: z.string().min(1, { message: "Please select a topic" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", topic: "", message: "" },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
  };




  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? " text-white" : " text-gray-900"
      }`}
    >
      <div className="absolute top-4 right-4">
        <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
      <Card className="w-full max-w-2xl shadow-lg">
        {isSubmitted ? (
          <CardContent className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-muted-foreground mb-6">
              Thank you for reaching out. We'll get back to you soon.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form and we'll respond within 24-48 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    name="topic"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topic</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">
                              General Inquiry
                            </SelectItem>
                            <SelectItem value="support">
                              Technical Support
                            </SelectItem>
                            <SelectItem value="billing">
                              Billing & Payments
                            </SelectItem>
                            <SelectItem value="feedback">
                              Feedback & Suggestions
                            </SelectItem>
                            <SelectItem value="partnership">
                              Partnership Opportunities
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your question or concern..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
