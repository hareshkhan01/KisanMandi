// src/pages/FarmingProducts.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  productUrl: string;
  rating: number;
}

export default function Product() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - Replace with actual API calls to Amazon Product API
  const products: Product[] =
  [
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    {
      "id": "1",
      "name": "Kraft Seeds Gardening Tools Kit",
      "price": "₹529.00",
      "imageUrl": "https://m.media-amazon.com/images/I/71-4IGXtwGL._SX679_.jpg",
      "productUrl": "https://www.amazon.in/dp/B07D7WGBBR",
      "rating": 4.5
    },
    
  ]
  
    

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Products Grid */}
      <main>
        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 font-bold">₹ {product.price}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <a
                      href={product.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Amazon
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}