import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Bid = {
  id: number
  vendorName: string
  amount: number
  time: string
  avatar: string
}

interface BidHistoryProps {
  bids: Bid[]
}

export default function BidHistory({ bids }: BidHistoryProps) {
  return (
    <div className="space-y-3">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={bid.avatar} alt={bid.vendorName} />
              <AvatarFallback>{bid.vendorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{bid.vendorName}</p>
              <p className="text-xs text-muted-foreground">{bid.time}</p>
            </div>
          </div>
          <p className="font-semibold">₹{bid.amount.toLocaleString()}</p>
        </div>
      ))}

      {bids.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No bids yet. Be the first to bid!
        </p>
      )}
    </div>
  );
}

