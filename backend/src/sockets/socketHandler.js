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
        
        const updateBid = async (auctionId, bidAmount, userId) => {
          try {
              // Fetch the auction
              const auction = await Auction.findById(auctionId);
              if (!auction) {
                  throw new Error("Auction not found");
              }
      
              // Find existing bid by the same user
              const existingBid = auction.highestBidder.find(bid => bid.user.toString() === userId);
      
              if (existingBid) {
                  // Update bid amount only if the new bid is higher
                  if (bidAmount > existingBid.amount) {
                      existingBid.amount = bidAmount;
                      existingBid.bidTime = new Date();
                  } else {
                      throw new Error("New bid must be higher than your previous bid");
                  }
              } else {
                  // Push a new bid if the user hasn't bid before
                  auction.highestBidder.push({
                      user: userId,
                      amount: bidAmount,
                      bidTime: new Date()
                  });
              }
      
              // Sort bids in descending order & keep only the top 3
              auction.highestBidder.sort((a, b) => b.amount - a.amount);
              if (auction.highestBidder.length > 3) {
                  auction.highestBidder = auction.highestBidder.slice(0, 3);
              }
      
              // Update currentBid (highest bid)
              auction.currentBid = auction.highestBidder[0]?.amount || 0;
      
              // Save the updated auction
              await auction.save();
      
              return auction; // Return the updated auction object
          } catch (error) {
              throw error;
          }
      };

        const updatedAuction = await updateBid(auctionId, bidAmount, userId);      
        

        // 5. Broadcast to all room participants
        io.to(auctionId).emit('bidUpdate', {
          auctionId,
          newBid: updatedAuction.currentBid,
          highestBidder: updatedAuction.highestBidder
        });

      } catch (error) {
        console.error('Bid processing error:', error);
        socket.emit('bidError', 'Failed to process bid');
      }
    });

    // Other handlers...
  });
};