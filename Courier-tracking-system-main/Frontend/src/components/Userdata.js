const Userdata = (props) => {
  const Status = async (e) => {
    console.log("clicked on change");
    const status = e.target.value;
    const userDetails = {
      _id,
      order_status: status,
    };
    const data1 = JSON.stringify(userDetails);
    const url = "http://localhost:3001/api/ubdatestatus";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data1,
    });
    const data = await response.json();
    if (response.ok === true) {
      console.log(data);
    } else {
      console.log("err");
    }
  };
  const { item_id, user_name, _id, order_status } = props.item;
  return (
    <ul className="flex items-center justify-evenly my-2 font-medium text-md text-center">
      <div className="my-1 p-2 w-4/12">
        <li className="hover:text-black">{user_name}</li>
      </div>
      <div className="my-1 p-2 w-4/12">
        <li className="hover:text-black">{item_id}</li>
      </div>
      <div className="my-1 p-2 w-4/12">
        <select
          name="Status"
          className="border-2 border-black"
          onChange={Status}
        >
          <option value="Ordered" selected>
            {order_status}
          </option>
          <option value="Shipped">Shipped</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Out for delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </ul>
  );
};
export default Userdata;
