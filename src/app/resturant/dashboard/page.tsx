"use client"
import DashboardFooditem from '@/app/_components/DashboardFooditem'
import Fooditems from '@/app/_components/Fooditems'

import ResturantHeader from '@/app/_components/ResturantHeader'
import React, { useState } from 'react'

const Dashboard = () => {
  const[addItems, setAddItems]= useState(false)
  return (
    <>  
    <ResturantHeader/>
   
    <button onClick={()=>setAddItems(true)}>Add to items</button>
    <button onClick={()=>setAddItems(false)}> Dashboard </button>
    {
      addItems ?  <Fooditems/> : <DashboardFooditem/>
    }

      
    </>
  )
}

export default Dashboard
