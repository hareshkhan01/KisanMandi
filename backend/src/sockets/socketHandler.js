// serever side socket logic

import Auction from '../models/auction.js';


export const setupAuctionHandlers = (io) => {
  io.on('connection', (socket) => {
    
    // Handle bid placement
    socket.on('placeBid', async ({ auctionId, bidAmount, userId }) => {
      try {
        // 1. Fetch auction from MongoDB
        const auction = await Auction.findById(auctionId);
        
        if (!auction) {
          return socket.emit('bidError', 'Auction not found');
        }

        // 2. Validate auction status
        if (auction.status !== 'open') {
          return socket.emit('bidError', 'Auction has closed');
        }

        // 3. Validate bid amount
        if (bidAmount <= auction.currentBid) {
          return socket.emit('bidError', 
            `Bid must be higher than current $${auction.currentBid}`);
        }

        // 4. Update in MongoDB
        
        const  updateBid = async (auctionId) => {
            try {
                //const { bidAmount, userId } = req.body;
        
                // Fetch the auction
                const auction = await auctionModel.findById(auctionId);
                if (!auction) {
                    return res.status(404).json({ message: "Auction not found" });
                }
        
                // Push the new bid into highestBidders array
                auction.highestBidder.push({
                    user: userId,
                    amount: bidAmount,
                    bidTime: new Date()
                });
        
                // Sort bids in descending order & keep only the top 3
                auction.highestBidder.sort((a, b) => b.amount - a.amount);
                if (auction.highestBidder.length > 3) {
                    auction.highestBidder = auction.highestBidders.slice(0, 3);
                }
        
                // Update currentBid (highest bid)
                auction.currentBid = auction.highestBidder[0].amount;
        
                // Save the updated auction
                await auction.save();
        
                res.json(auction);
            } catch (error) {
                next(error);
            }
        }
        

        // 5. Broadcast to all room participants
        io.to(auctionId).emit('bidUpdate', {
          auctionId,
          newBid: updateBid.currentBid,
          highestBidder: updateBid.highestBidder
        });

      } catch (error) {
        console.error('Bid processing error:', error);
        socket.emit('bidError', 'Failed to process bid');
      }
    });

    // Other handlers...
  });
};