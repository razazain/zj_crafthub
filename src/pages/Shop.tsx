import React from 'react'
import Products from '../components/Products'
import ShopHero from '../components/ShopHero'

const Shop: React.FC = () => {
  return (
    <div>
      <ShopHero />

      <Products />
    </div>
  )
}

export default Shop