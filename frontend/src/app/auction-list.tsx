import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, BarChart2, Eye } from "lucide-react";
import { getAuctions } from "@/http/api";
import { useEffect,useState } from "react";
import useTokenStore from "@/http/store";

interface AuctionItem {
  id: string;
  name: string;
  image?: string;
  farmer: { name: string };
  category: string;
  timeLeft: number;
  currentBid: number;
  bidCount: number;
  reserveMet?: boolean;
}

interface AuctionListProps {
  auctions: AuctionItem[];
  showManageOptions?: boolean;
}

export default function AuctionList({
  auctions,
  showManageOptions = false,
}: AuctionListProps) {
  const [auctionList,setAuctionList] = useState([]);
  const role = useTokenStore((state) => state.role);
  console.log(role)
  // useEffect(() => {
  //   const fetchAuctions = async () => {
  //     try {
  //       const response = await getAuctions();
  //       console.log(response)
  //       setAuctionList(response);
  //     } catch (error) {
  //       console.error('Error fetching auctions:', error);
  //     }
  //   };
  //   fetchAuctions();
  // },[]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((auction) => (
        <Card key={auction._id} className="overflow-hidden p-0">
          <div className="relative">
            <div className="relative h-72 w-full">
              <img
                src={auction.images[0] || "img/1.jpg"}
                alt={auction.description}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-2 right-2">
              <Badge
                variant="outline"
                className="bg-white/90 text-black font-medium"
              >
                {auction.category}
              </Badge>
            </div>
            {auction.reserveMet === false && (
              <div className="absolute bottom-2 right-2">
                <Badge variant="outline" className="bg-amber-500/90 text-white">
                  Reserve not met
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-4 pt-0">
            <div className="mb-2">
              <h3 className="font-semibold text-2xl line-clamp-1">
                {auction.product}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                by {auction.farmer.name}
              </p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-lg font-bold">
                  ₹{auction.currentBid.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Bids</p>
                <p className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {auction.highestBidder.length}
                </p>
              </div>
            </div>

            {/* <div className="mb-4">
              <div className="flex items-center gap-1 text-amber-600 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Ends in:</span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="bg-muted rounded-sm p-1">
                  <p className="text-sm font-bold">
                    {Math.floor(auction.timeLeft / (1000 * 60 * 60))}
                  </p>
                  <p className="text-xs text-muted-foreground">Hours</p>
                </div>
                <div className="bg-muted rounded-sm p-1">
                  <p className="text-sm font-bold">
                    {Math.floor(
                      (auction.timeLeft % (1000 * 60 * 60)) / (1000 * 60)
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>
                <div className="bg-muted rounded-sm p-1">
                  <p className="text-sm font-bold">
                    {Math.floor((auction.timeLeft % (1000 * 60)) / 1000)}
                  </p>
                  <p className="text-xs text-muted-foreground">Seconds</p>
                </div>
              </div>
            </div> */}

            {showManageOptions ? (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <a
                    href={`/auctions/${auction.id}`}
                    className="flex items-center"
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <a
                    href={`/auctions/${auction.id}/stats`}
                    className="flex items-center"
                  >
                    <BarChart2 className="h-4 w-4 mr-1" /> Stats
                  </a>
                </Button>
              </div>
            ) : (
              <Button className="w-full">
                <a href={`/auctions/${auction._id}`}>View Auction</a>
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
