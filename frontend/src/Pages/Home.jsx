import React from 'react'
import Banner from '../Components/Banner.jsx'
import Aboutus from '../Components/AboutUs.jsx'
import Counter from '../Components/Counter.jsx'
import Services from '../Components/Services.jsx'
import Features from '../Components/Features.jsx'
import Product from '../Components/Product.jsx'
import Testimonials from '../Components/Testimonials.jsx'
import OurTeam from '../Components/OurTeam.jsx'
import Blogs from '../Components/Blogs.jsx'


const Home = () => {
  return (
    <>
    <Banner></Banner>
    <Aboutus></Aboutus>
    <Counter></Counter>
    <Services></Services>
    <Features></Features>
    <Product></Product>
    <Testimonials></Testimonials>
    <OurTeam></OurTeam>
    <Blogs></Blogs>
    </>
  )
}

export default Home