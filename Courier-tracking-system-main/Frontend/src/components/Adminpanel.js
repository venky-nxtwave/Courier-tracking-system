import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Userdata from './Userdata'
import { useEffect, useState } from 'react'

const Adminpanel = () => {
  const navigate = useNavigate()
  const [userdata,setUserData]=useState(null);

  const getdata=async()=>{
    const url = 'http://localhost:3001/api/getitems'
    const response=await fetch(url);
    const data=await response.json();
    setTimeout(()=>{setUserData(data)},1000)
  }

  useEffect(()=>{
    getdata();
  },[])

  const handleAddUser = (e) => {
    e.preventDefault()
    navigate('/admin/adduser')
  }
  return (
    <div>
      <Header />
      <div className="text-center m-5">
        <button
          onClick={handleAddUser}
          className="border bg-teal-400 p-2 rounded-md mt-12"
        >
          Add Order
        </button>
      </div>
      <div className="bg-white">
        <ul className="flex items-center justify-evenly mt-4 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-20 font-medium text-xl text-center">
          <div className="w-4/12">
            <li className="hover:text-orange-400">Name</li>
          </div>
          <div className="w-4/12">
            <li className="hover:text-orange-400">OrderId</li>
          </div>
          <div className="w-4/12">
            <li className="hover:text-orange-400">Status</li>
          </div>
        </ul>
             {/* {console.log(userdata[0])}  */}
           {userdata && (
              userdata.map((item)=>(<Userdata item={item} key={item._id}/>))
              
           )}  
      </div>
    </div>
  )
}

export default Adminpanel

