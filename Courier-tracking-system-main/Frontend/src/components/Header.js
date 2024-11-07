import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="bg-white h-[15vh] font-sans">
      <div className="flex justify-between items-center h-full">
        <div>
          <img
            src="https://www.manageteamz.com/courier-delivery-management-software/images/courier-img.svg"
            className="w-30 md:w-50 h-16 md:h-40 pl-4 md:pl-8 pt-12 "
            alt="Courier Delivery"
          />
          <p className=" text-white font-bold text-2xl mx-36 text-center">
            Courier Express
          </p>
        </div>
        <ul className="flex items-center mr-4 mt-6 md:mt-10 mb-2 md:mb-5 text-xl md:text-xl text-center hover:cursor-pointer">
          <Link to="/browse">
            <li className="pl-4 md:pl-8 hover:text-red-500">Home</li>
          </Link>
          <li className="pl-4 md:pl-8 hover:text-red-500">Track Shipment</li>
          <Link to="/">
            <li className="pl-4 md:pl-8 pr-4 md:pr-5 hover:text-red-500">
              Logout
            </li>
          </Link>
        </ul>
      </div>
      <hr className="bg-teal-400 h-12"></hr>
    </div>
  )
}

export default Header
