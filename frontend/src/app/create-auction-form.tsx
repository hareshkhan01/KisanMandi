"use client"

import type React from "react"

import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format, min } from "date-fns"
import { CalendarIcon, Upload, X, Info, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import { createAuction } from "@/http/api"
import { useMutation} from '@tanstack/react-query'
import axios, { AxiosResponse } from "axios";


// Form schema validation
const formSchema = z.object({
  productName: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  quality: z.string().min(1, { message: "Quality grade is required" }),
  harvestDate: z.date({ required_error: "Harvest date is required" }),
  expiryDate: z.date().optional(),
  startingBid: z.string().min(1, { message: "Starting bid is required" }),
  bidIncrement: z.string().min(1, { message: "Bid increment is required" }),
  reservePrice: z.string().optional(),
  auctionDuration: z.string().min(1, { message: "Auction duration is required" }),
  pickupLocation: z.string().min(1, { message: "Pickup location is required" }),
  shippingAvailable: z.boolean().default(false),
  shippingDetails: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

const cloudName: string = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with actual Cloudinary cloud name
const uploadPreset: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your Cloudinary upload preset if applicable

type FormValues = z.infer<typeof formSchema>

export default function CreateAuctionForm() {
  // const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState("product-details")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      quantity: "",
      unit: "kg",
      quality: "",
      harvestDate: new Date(),
      startingBid: "",
      bidIncrement: "50",
      auctionDuration: "3",
      pickupLocation: "",
      shippingAvailable: false,
      certifications: [],
      termsAccepted: false,
    },
  })

  // Watch for shipping available to conditionally show shipping details
  const shippingAvailable = form.watch("shippingAvailable")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
      }
    };

      const handleUpload = async () => {
        if (selectedFiles.length === 0) {
          alert("Please select files to upload.");
          return;
        }

        console.log(cloudName);

        setUploading(true);
        const uploadedImages: string[] = [];

        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset); // Required for unsigned uploads

          try {
            const response: AxiosResponse<{ secure_url: string }> =
              await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData,
                {
                  headers: { "Content-Type": "multipart/form-data" },
                }
              );
              console.log(response.data);
            uploadedImages.push(response.data.secure_url); // Save the image URL
            // const img = [...uploadedUrls, response.data.secure_url];
            setUploadedUrls(uploadedUrls);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }

        console.log(22,uploadedImages);
        // setUploadedUrls(uploadedImages);
        console.log(23,uploadedUrls);
        setUploading(false);
        return uploadedImages;
      };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)

    // In a real app, you would upload these to your storage service
    // For this demo, we'll create local URLs
    // const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
    console.log(selectedFiles)

    // Limit to 4 images
    // setImages((prev) => [...prev, ...newImages].slice(0, 4))
    setUploading(false)
  }

  // Remove an image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }


  const mutation = useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      console.log("Auction created successfully:", data);
      alert("Auction created successfully! Redirecting to your listings...");
      // Optionally reset the form and images, and perform any redirection
      form.reset();
      setImages([]);
      // router.push('/farmer/listings'); // Uncomment if using a router
    },
    onError: (error) => {
      console.error("Auction creation failed:", error);
      alert("Auction creation failed, please try again.");
    },
  });

  // Handle form submission
  // const onSubmit = (data: FormValues) => {
  //   // In a real app, you would send this data to your API
  //   console.log({
  //     ...data,
  //     images,
  //     startingBid: Number.parseFloat(data.startingBid),
  //     bidIncrement: Number.parseFloat(data.bidIncrement),
  //     reservePrice: data.reservePrice ? Number.parseFloat(data.reservePrice) : undefined,
  //   })

  //   // Show success message and redirect
  //   alert("Auction created successfully! Redirecting to your listings...")

  //   // In a real app, you would redirect to the newly created auction or a listings page
  //   // router.push('/farmer/listings');

  //   // For demo purposes, we'll just reset the form
  //   form.reset()
  //   setImages([])
  // }
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const urls = await handleUpload();
    console.log(11, urls);

    // Map form values to the payload structure expected by your API
    const auctionPayload = {
      product: data.productName, // mapping productName to product
      category: data.category,
      description: data.description,
      quality: data.quality,
      unit: data.unit,
      pickupLocation: data.pickupLocation,
      harvestDate: data.harvestDate.toLocaleDateString(),
      startingBid: Number.parseInt(data.startingBid),
      minBidIncrement: Number.parseInt(data.bidIncrement),
      quantity: Number.parseInt(data.quantity),
      duration: Number.parseInt(data.auctionDuration, 10),
      images: urls,
      // You can also include additional fields if needed (e.g., images)
    };

    console.log(auctionPayload);
    // Trigger the mutation to create the auction
    mutation.mutate(auctionPayload);

      form.reset()
      setImages([])
  };

  // Move to next tab
  const nextTab = () => {
    if (activeTab === "product-details") {
      setActiveTab("pricing-details")
    } else if (activeTab === "pricing-details") {
      setActiveTab("shipping-details")
    }
  }

  // Move to previous tab
  const prevTab = () => {
    if (activeTab === "shipping-details") {
      setActiveTab("pricing-details")
    } else if (activeTab === "pricing-details") {
      setActiveTab("product-details")
    }
  }

  return (
    <Card className="mb-10">
      <CardContent className="p-6 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="product-details">Product Details</TabsTrigger>
            <TabsTrigger value="pricing-details">
              Pricing & Duration
            </TabsTrigger>
            <TabsTrigger value="shipping-details">Shipping & Terms</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="product-details" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Organic Red Apples"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fruits">Fruits</SelectItem>
                            <SelectItem value="vegetables">
                              Vegetables
                            </SelectItem>
                            <SelectItem value="grains">
                              Grains & Cereals
                            </SelectItem>
                            <SelectItem value="dairy">
                              Dairy Products
                            </SelectItem>
                            <SelectItem value="meat">Meat & Poultry</SelectItem>
                            <SelectItem value="nuts">Nuts & Seeds</SelectItem>
                            <SelectItem value="herbs">
                              Herbs & Spices
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product in detail including growing methods, taste, texture, etc."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity*</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kg">Kilograms (kg)</SelectItem>
                              <SelectItem value="g">Grams (g)</SelectItem>
                              <SelectItem value="lb">Pounds (lb)</SelectItem>
                              <SelectItem value="ton">Tons</SelectItem>
                              <SelectItem value="box">Boxes</SelectItem>
                              <SelectItem value="crate">Crates</SelectItem>
                              <SelectItem value="piece">Pieces</SelectItem>
                              <SelectItem value="dozen">Dozen</SelectItem>
                              <SelectItem value="liter">Liters</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="quality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quality Grade*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quality grade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="grade-a">
                              Grade A (Premium)
                            </SelectItem>
                            <SelectItem value="grade-b">
                              Grade B (Standard)
                            </SelectItem>
                            <SelectItem value="grade-c">
                              Grade C (Economy)
                            </SelectItem>
                            <SelectItem value="Organic">
                              Certified Organic
                            </SelectItem>
                            <SelectItem value="Natural">
                              Natural (No Certification)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="harvestDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Harvest Date*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value || undefined}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          If applicable, when will this product expire?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Product Images (Up to 4)*</FormLabel>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-md overflow-hidden border"
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {images.length < 4 && (
                      <div className="border border-dashed rounded-md flex items-center justify-center aspect-square relative">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer h-full"
                          onChange={handleImageUpload}
                          disabled={uploading}
                        />
                        <div className="text-center p-4">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {uploading ? "Uploading..." : "Upload Image"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {images.length === 0 && (
                    <p className="text-sm text-destructive mt-2">
                      Please upload at least one product image
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab}>
                    Next: Pricing & Duration
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="pricing-details" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startingBid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Bid (INR)*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              type="number"
                              min="1"
                              step="0.01"
                              className="pl-7"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The minimum bid to start the auction
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bidIncrement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Bid Increment (INR)*</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                              ₹
                            </span>
                            <Input
                              type="number"
                              min="1"
                              step="0.01"
                              className="pl-7"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Minimum amount a new bid must exceed the current bid
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <FormField
                  control={form.control}
                  name="reservePrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Reserve Price () (Optional)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                A reserve price is the minimum amount you're
                                willing to accept. If bidding doesn't reach this
                                price, you're not obligated to sell.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₹
                          </span>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            className="pl-7"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Hidden minimum price you're willing to accept
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="auctionDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Auction Duration (Days)*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="10">10 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How long your auction will be active
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">
                        Auction Fee Information
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Our platform charges a 5% fee on the final selling
                        price. This fee helps maintain the platform and provide
                        services like secure payments, vendor verification, and
                        dispute resolution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Back: Product Details
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next: Shipping & Terms
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="shipping-details" className="space-y-6">
                <FormField
                  control={form.control}
                  name="pickupLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Location*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Farm address or nearest town"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Where vendors can pick up the products
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shippingAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Shipping Available
                        </FormLabel>
                        <FormDescription>
                          Can you arrange shipping for this product?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {shippingAvailable && (
                  <FormField
                    control={form.control}
                    name="shippingDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe shipping options, costs, and limitations"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide information about shipping methods, costs, and
                          any restrictions
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="certifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certifications (Optional)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "organic", label: "Certified Organic" },
                          { id: "non-gmo", label: "Non-GMO" },
                          { id: "fair-trade", label: "Fair Trade" },
                          { id: "pesticide-free", label: "Pesticide-Free" },
                        ].map((cert) => (
                          <label
                            key={cert.id}
                            className="flex items-center gap-2 border rounded-md p-3 cursor-pointer hover:bg-muted"
                          >
                            <input
                              type="checkbox"
                              value={cert.id}
                              checked={(field.value || []).includes(cert.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                const currentValues = field.value || [];
                                field.onChange(
                                  checked
                                    ? [...currentValues, cert.id]
                                    : currentValues.filter(
                                        (value) => value !== cert.id
                                      )
                                );
                              }}
                              className="h-4 w-4"
                            />
                            {cert.label}
                          </label>
                        ))}
                      </div>
                      <FormDescription>
                        Select any certifications that apply to your product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the Terms and Conditions*
                        </FormLabel>
                        <FormDescription>
                          By creating this auction, you agree to our{" "}
                          <a href="#" className="text-primary underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary underline">
                            Seller Guidelines
                          </a>
                          .
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Back: Pricing & Duration
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Auction
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}

