import Banner from '@/app/Banner'
import Aboutus from '@/app/AboutUs'
import Counter from '@/app/Counter'
import Services from '@/app/Services'
import Features from '@/app/Features'
import Product from '@/app/Product'
import Testimonials from '@/app/Testimonials'
import OurTeam from '@/app/OurTeam'
import Blogs from "@/app/Blogs"

import { getAuctions } from '@/http/api'


export default function Home() {
  getAuctions()
  return (
    <>
    <Banner/>
    <Aboutus/>
    <Counter/>
    <Services/>
    <Features/>
    <Product/>
    <Testimonials/>
    <OurTeam/>
    <Blogs/>
    </>
  )
}
