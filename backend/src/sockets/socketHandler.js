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
        const updatedAuction = await Auction.findByIdAndUpdate(
          auctionId,
          { 
            currentBid: bidAmount,
            highestBidder: userId 
          },
          { new: true } // Return updated document
        );

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