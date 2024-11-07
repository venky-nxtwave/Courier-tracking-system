import React, { useEffect, useRef, useState } from 'react'
import Trackingdata from './Trackingdata'
import Header from './Header';

const Body = () => {
  const itemid = useRef(null)

  const [userData,setUserData]=useState(null);

const handleSubmit = async (e) => {
    e.preventDefault()
    const item_id={
      item_id:itemid.current.value
    }
    const data1 = JSON.stringify(item_id)
    const url = 'http://localhost:3001/api/getItem'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data1,
    })
    const data = await response.json()
    //console.log(data)
    if (response.ok === true) {
      setUserData(data);
    } else {
      console.log(response.ok)
      alert("Item not found")
    }
  }

  useEffect(()=>{
  },[userData])

  return (
    <div>
      <Header />
      {!userData &&  <div className="relative">
        <img
          src="https://static.vecteezy.com/system/resources/previews/015/400/611/non_2x/delivery-service-concept-and-application-for-tracking-online-orders-food-delivery-man-courier-riding-electric-scooter-with-yellow-package-product-box-illustration-for-website-mobile-app-vector.jpg"
          className="h-[80vh] w-full object-cover mt-12"
          alt="Delivery"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              ref={itemid}
              type="input"
              placeholder="Enter your tracking number"
              className="border-2 border-black-400 h-[40px] md:h-[50px] w-[80%] md:w-[300px] px-1 rounded-lg"
            />
            <button type="submit" className="mt-2 h-[40px] md:h-[50px] w-[80%] md:w-[150px] text-center bg-amber-500 rounded-lg text-white text-xl pb-1 hover:bg-orange-500">
              Search
            </button>
          </form>
        </div>
      </div>}
        {userData && <Trackingdata usedata={userData}/>}
    </div>
  )
}


export default Body 


