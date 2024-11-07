const Trackingdata = (usedata) => {
  // const {usedata}=usedata
  const { item_id, order_status, user_name } = usedata.usedata;
  return (
    <div className="bg-[url(https://ecomexpress.in/_nuxt/track-shipment-bg.2ff3aeb0.png)] h-screen">
      <div className="flex items-center justify-center my-[10%]">
        <div className="h-[300px] w-[700px] shadow-2xl flex  ">
          <div>
            <div className="flex flex-col mx-12 my-2">
              <h1 className="text-gray-500">User Name</h1>
              <p className="text-black text-xl font-semibold py-2">
                {user_name}
              </p>
            </div>
            <div className="flex flex-col mx-12 my-2">
              <h1 className="text-gray-500">AWB No. | Order No.</h1>
              <p className="text-black text-xl font-semibold py-2">{item_id}</p>
            </div>
            <div className="flex flex-col mx-12">
              <h1 className="text-gray-500">status</h1>
              <p className="text-black text-xl font-semibold py-2">
                {order_status}
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://img.freepik.com/premium-vector/delivery-truck-with-map-location-route-path-concept-cargo-van-moving-fast-express-delivery-service-icon-with-van-destination-point-point-navigation-delivery-way-geo-location-location-pin_435184-1083.jpg"
              alt="Trackinglogo"
              className="h-[300px] w-[400px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Trackingdata;
