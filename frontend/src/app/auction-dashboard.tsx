import { use, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import AuctionList from "@/app/auction-list";
import { mockAllAuctions, mockMyAuctions } from "@/lib/mock-data";
import useTokenStore from "@/http/store";
import { getAuctions } from "@/http/api";

export default function AuctionDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("ending-soon");
  const role = useTokenStore((state) => state.role);
  const [auctionList, setAuctionList] = useState([]);
  const [filteredAllAuctions, setFilteredAllAuctions] = useState([]);
  const [filteredMyAuctions, setFilteredMyAuctions] = useState([]);

  // Filter auctions based on search query and category
  // const filterAuctions = (auctions) => {
  //   return auctions.filter((auction) => {
  //     const matchesSearch =
  //       auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       auction.farmer.name.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesCategory =
  //       categoryFilter === "all" || auction.category === categoryFilter;
  //     return matchesSearch && matchesCategory;
  //   });
  // };

  // Sort auctions based on selected option
  // const sortAuctions = (auctions) => {
  //   return [...auctions].sort((a, b) => {
  //     switch (sortOption) {
  //       case "ending-soon":
  //         return a.timeLeft - b.timeLeft;
  //       case "price-low":
  //         return a.currentBid - b.currentBid;
  //       case "price-high":
  //         return b.currentBid - a.currentBid;
  //       case "newest":
  //         return new Date(b.createdAt) - new Date(a.createdAt);
  //       default:
  //         return 0;
  //     }
  //   });
  // };

  interface Auction {
    id: string;
    name: string;
    farmer: { name: string };
    category: string;
    timeLeft: number;
    currentBid: number;
    bidCount: number;
    createdAt: string;
  }

  // let a = [];
  const filterAuctions = (auctions) => {
    // console.log(2, auctions)
    return auctions.filter((auction) => {
      // console.log(69, auction)
      const matchesSearch =
        auction.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        auction.farmer.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || auction.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  };

  const sortAuctions = (auctions) => {
    return [...auctions].sort((a, b) => {
      switch (sortOption) {
        case "ending-soon":
          return a.timeLeft - b.timeLeft;
        case "price-low":
          return a.currentBid - b.currentBid;
        case "price-high":
          return b.currentBid - a.currentBid;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });
  };

  let count = 0;

  useEffect(() => {

    console.log(++count, searchQuery)

    if (searchQuery === "") {
      setFilteredAllAuctions(auctionList);
    }

    if(auctionList){
      setFilteredAllAuctions(sortAuctions(filterAuctions(auctionList)));
      // setFilteredMyAuctions(sortAuctions(filterAuctions(auctionList)));
      // console.log(169,filteredAllAuctions);
    }

  },[searchQuery, categoryFilter, sortOption, auctionList]);


    useEffect(() => {
      const fetchAuctions = async () => {
        try {
          const response = await getAuctions();
          // console.log(response)
          setAuctionList(response);
          setFilteredAllAuctions(response);
        } catch (error) {
          console.error('Error fetching auctions:', error);
        }
      };
      fetchAuctions();
    },[]);

// console.log(10, auctionList);
// console.log(39,sortAuctions(filteredAllAuctions))
  // const filteredAllAuctions = sortAuctions(filterAuctions(auctionList));
  const filteredMyAuctions = sortAuctions(filterAuctions(auctionList));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Auction Marketplace
          </h1>
          <p className="text-muted-foreground">
            Browse and manage agricultural product auctions
          </p>
        </div>
        <Button
          onClick={() => navigate("/create-auction")}
          className="bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Auction
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by product or farmer name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains & Cereals</SelectItem>
              <SelectItem value="dairy">Dairy Products</SelectItem>
              <SelectItem value="meat">Meat & Poultry</SelectItem>
              <SelectItem value="nuts">Nuts & Seeds</SelectItem>
              <SelectItem value="herbs">Herbs & Spices</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all-auctions" className="w-full">
        {role === "farmer" ? (
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all-auctions">All Auctions</TabsTrigger>
            <TabsTrigger value="my-auctions">My Auctions</TabsTrigger>
          </TabsList>
        ) : (
          <TabsList className="grid w-full grid-cols-1 mb-8">
            <TabsTrigger value="all-auctions">All Auctions</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="all-auctions">
          {filteredAllAuctions.length > 0 ? (
            <AuctionList auctions={filteredAllAuctions} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No auctions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-auctions">
          {filteredMyAuctions.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Your Active Auctions
                </h2>
                <p className="text-muted-foreground">
                  Manage your current auctions and track bidding activity
                </p>
              </div>
              <AuctionList
                auctions={filteredMyAuctions}
                showManageOptions={true}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">
                You don't have any active auctions
              </h3>
              <p className="text-muted-foreground mb-6">
                Create your first auction to start selling your products
              </p>
              <Button
                onClick={() => navigate("/create-auction")}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Auction
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
