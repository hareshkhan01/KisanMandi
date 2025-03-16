import BiddingPage from "@/app/Bidding_Page";
import {socketConnect} from "../socket/socket.js"


const Bidding = () => {
  socketConnect();
  return (
    <>
    <BiddingPage />
    </>
  )
}

export default Bidding;
