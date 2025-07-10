import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Header from '../components/homeComponents/header/Header'
import Popular from '../components/homeComponents/popularItems/Popular'
import Gifts from '../components/homeComponents/gifts/Gifts'
import PreFooter from '../components/homeComponents/prefooter/PreFooter'

const Home = () => {
  const products = useSelector((state: RootState) => state.products.products)

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <Popular products={products} />
      <Gifts />
      <PreFooter />
    </div>
  )
}

export default Home