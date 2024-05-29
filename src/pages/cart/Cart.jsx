import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import Empty from './Empty';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection,doc,getDocs,getDoc,updateDoc,increment } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';


function Cart() {

  const context = useContext(myContext)
  const { mode,getFromCartFirebase,currentUser,deleteFromCartFirebase,clearcartfromFirebase } = context;

  const dispatch = useDispatch()
  // const cartItems = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Fetch cart items from Firebase when the component mounts
    if (currentUser != null) {
      getFromCartFirebase(currentUser.uid)
        .then(items => {
          setCartItems(items);
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [currentUser]);


//tryingend




  // console.log(cartItems)

  const deleteCart = async (item,uid) => {
    try {
      deleteFromCartFirebase(item.id,uid)
      let deleted = false;
      const updatedCartItems = cartItems.filter(i => {
        if (!deleted && i.id === item.id) {
            deleted = true; // Mark item as deleted
            return false; // Filter out the item
        }
        return true; // Keep other items in the array
    });
    setCartItems(updatedCartItems);
  } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Error removing")
    }
};

const clearCart = async()=>{
  if(currentUser!=null && grandTotal!=100){
    clearcartfromFirebase(currentUser.uid)
    setCartItems([])
  }else{
    toast.error("You have nothing in your cart")
  }
}
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
  }, [cartItems])

  const [totalAmout, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price*cartItem.quantitynum)
    })
    setTotalAmount(temp);
    console.log(temp)
  }, [cartItems])

  const shipping = parseInt(100);

  const grandTotal = shipping + totalAmout;


  // console.log(grandTotal)

  /**========================================================================
   *!                           Payment Intigration
   *========================================================================**/ 

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [canproceed, setcanproceed] = useState(true)


  const buyNow = async () => {

    const userRef = collection(fireDB, "cart"+currentUser.uid);
    const querySnapshot = await getDocs(userRef);

    querySnapshot.forEach(async(docc) => {
      const productred = collection(fireDB, "products");
      const productSnapshot =  await getDocs(productred);
      productSnapshot.forEach(async (productDoc) => {
        const productId = docc.data().id;
        if (productDoc.id === productId) {
          if(productDoc.data().quantity < docc.data().quantitynum){
            const name=productDoc.data().title
            toast.error(`${name} Currently Our Of Stock`)
            setcanproceed(false)
            return
           }
          // console.log("heyhi",productDoc.data().quantity," ",docc.data().quantitynum)
        }
      });
    });

    if(canproceed==true){

    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    var options = {
      key: "rzp_test_Rkom9erIjatXik",
      key_secret: "9eOxCzB4eHshIabm20U0e5lD",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "The GiftCase",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {

          const orderRef = collection(fireDB, 'order');
          addDoc(orderRef, orderInfo);

        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };

    // var pay = new window.Razorpay(options);
    // pay.open();
    // console.log(pay)

    // quantity reduce after order=>

        querySnapshot.forEach(async(docc) => {
          const productred = collection(fireDB, "products");
          const productSnapshot =  await getDocs(productred);
          productSnapshot.forEach(async (productDoc) => {
            const productId = docc.data().id;
            const productRef = doc(fireDB, "products", productId);
            if (productDoc.id === productId) {
              await updateDoc(productRef, {
                quantity: increment(-(docc.data().quantitynum))
              })
            }
          });
        });
    }
  }





  // //////////// payement integration end //////////

  return (
    <Layout >
    {cartItems.length > 0 ? (
      <div className="h-screen bg-gray-100 pt-5 mb-[60%] " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl,quantitynum,orderDescription } = item;
              return (
                <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      <h1 className="leading-relaxed border-b-2 mb-5 pb-5">
                                Quantity:  
                                <span style={{color:'red'}}>
                                &nbsp;&nbsp;
                                <div>
                                    {/* <button onClick={
                                    item.quantitynum-=1
                                    }>-</button> */}
                                    <span>{item.quantitynum}</span>
                                    {/* <button onClick={
                                    item.quantitynum+=1
                                    }>+</button> */}
                                </div>
                                </span>
                            </h1>
                      <h1> Order Description : 
                      {orderDescription}
                      </h1>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                    </div>
                    <div onClick={() => deleteCart(item,currentUser.uid)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>
                   

                  </div>
                </div>
              )
            })}

          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmout}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            
          
  <Modal
    name={name}
    address={address}
    pincode={pincode}
    phoneNumber={phoneNumber}
    setName={setName}
    setAddress={setAddress}
    setPincode={setPincode}
    setPhoneNumber={setPhoneNumber}
    buyNow={buyNow}
    onClick={()=>
      window.alert("hey")
    }
  />




    <button
        style={{ marginTop: '1vh' }}
        onClick={() => clearCart()}
        className="w-full bg-red-600 py-2 text-center rounded-lg text-white font-bold"
    >
        Clear Cart
    </button>


          </div>
          
        </div>
      </div>
    ): <Empty></Empty>}
    </Layout>
  )
}

export default Cart