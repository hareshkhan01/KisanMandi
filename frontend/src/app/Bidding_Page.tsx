"use client";

import type React from "react";

import { useState, useEffect } from "react";
// import Image from "next/image";
import {
  Clock,
  Award,
  ArrowUp,
  Users,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BidHistory from "@/app/bid-history";
import CountdownTimer from "@/app/countdown-timer";

import {placeBid} from "@/socket/socket.js";

// Mock data - in a real app, this would come from your API/database
const initialProduct = {
  id: "prod-123",
  name: "Premium Organic Apples",
  description:
    "Fresh, organic apples harvested from sustainable orchards. Perfect for retail stores and restaurants.",
  farmer: {
    name: "Green Valley Farms",
    location: "Riverside County",
    rating: 4.8,
    image: "/placeholder.svg?height=50&width=50",
  },
  quantity: "500 kg",
  minBid: 1200,
  currentBid: 1350,
  bidIncrement: 50,
  timeLeft: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
  images: [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg?height=1000&width=1500",
    "img/4.jpg?height=400&width=600",
  ],
  category: "Fruits",
  quality: "Grade A",
  harvestDate: "2023-10-15",
};

const initialBids = [
  {
    id: 1,
    vendorName: "Fresh Foods Co.",
    amount: 1350,
    time: "10 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    vendorName: "Organic Markets",
    amount: 1300,
    time: "25 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    vendorName: "City Grocers",
    amount: 1250,
    time: "45 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    vendorName: "Farm to Table Inc.",
    amount: 1200,
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function BiddingPage() {
  const [product, setProduct] = useState(initialProduct);
  const [bids, setBids] = useState(initialBids);
  const [bidAmount, setBidAmount] = useState(
    product.currentBid + product.bidIncrement
  );
  const [activeImage, setActiveImage] = useState(0);
  const [showAllBidders, setShowAllBidders] = useState(false);

  // In a real app, you would fetch product data and bids from your API
  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      // This would be replaced with WebSocket or polling in a real app
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bidAmount <= product.currentBid) {
      alert("Your bid must be higher than the current bid");
      return;
    }

    placeBid(bids.length+1, bidAmount, "user123");
    // In a real app, you would send this bid to your API
    const newBid = {
      id: bids.length + 1,
      vendorName: "Your Company", // In a real app, this would be the logged-in user
      amount: bidAmount,
      time: "Just now",
      avatar: "/placeholder.svg?height=40&width=40",
    };

    setBids([newBid, ...bids]);
    setProduct({
      ...product,
      currentBid: bidAmount,
    });
    setBidAmount(bidAmount + product.bidIncrement);
  };

  const visibleBids = showAllBidders ? bids : bids.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Images and Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className=" rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-[300px] md:h-[400px] w-full">
              <img
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                className="object-fill h-fit w-full"
              />
            </div>
            <div className="p-4 flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 cursor-pointer border-2 rounded ${
                    activeImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="object-cover rounded h-[100%] w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Product Details</TabsTrigger>
                  <TabsTrigger value="farmer">Farmer Info</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping & Pickup</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Description</h3>
                    <p className="text-muted-foreground">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Category
                      </h4>
                      <p>{product.category}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Quality
                      </h4>
                      <p>{product.quality}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Quantity
                      </h4>
                      <p>{product.quantity}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Harvest Date
                      </h4>
                      <p>{product.harvestDate}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="farmer">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={product.farmer.image}
                        alt={product.farmer.name}
                      />
                      <AvatarFallback>
                        {product.farmer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {product.farmer.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {product.farmer.location}
                      </p>
                      <div className="flex items-center mt-2">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">
                          {product.farmer.rating}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          /5 Rating
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping">
                  <div className="space-y-4">
                    <p>
                      Shipping and pickup options will be finalized after the
                      auction ends. The farmer typically offers:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Farm pickup (free)</li>
                      <li>Local delivery within 50 miles (fee varies)</li>
                      <li>Shipping arrangements for long-distance buyers</li>
                    </ul>
                    <p className="text-muted-foreground text-sm mt-4">
                      Note: Exact shipping costs and logistics will be discussed
                      with the farmer after winning the bid.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Bidding Section */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {product.category}
                  </Badge>
                  <span className="text-muted-foreground text-sm ml-2">
                    {product.quantity}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-3xl font-bold">
                      ₹{product.currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Starting Bid
                    </p>
                    <p className="text-xl">
                      ₹{product.minBid.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Auction ending in:
                  </span>
                </div>

                <CountdownTimer initialTimeInMs={product.timeLeft} />

                <Progress
                  value={(product.currentBid / (product.minBid * 2)) * 100}
                  className="h-2"
                />

                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{bids.length} bids</span> so
                  far. Minimum increment: ₹{product.bidIncrement}
                </p>
              </div>

              <form onSubmit={handleBidSubmit} className="space-y-4">
                <div>
                  <label htmlFor="bid-amount" className="text-sm font-medium">
                    Your Bid (INR)
                  </label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₹
                    </span>
                    <Input
                      id="bid-amount"
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      className="pl-7"
                      min={product.currentBid + 1}
                      step={1}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Place Bid
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing a bid, you agree to the terms and conditions of
                  this auction.
                </p>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Recent Bidders
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllBidders(!showAllBidders)}
                  className="h-8 px-2"
                >
                  {showAllBidders ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show All
                    </>
                  )}
                </Button>
              </div>

              <BidHistory bids={visibleBids} />

              {!showAllBidders && bids.length > 3 && (
                <p className="text-sm text-center text-muted-foreground mt-3">
                  + {bids.length - 3} more bidders
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
