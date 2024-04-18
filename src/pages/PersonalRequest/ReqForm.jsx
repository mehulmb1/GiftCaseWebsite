import React, { useContext, useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';
import { Switch } from '@headlessui/react';
import myContext from '../../context/data/myContext';
import Modal from '../../components/modal/Modal';

export const ReqForm = () => {
  const context = useContext(myContext)
  const { mode,currentUser,userData,user } = context;


  const [agreed, setAgreed] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

// trying
  

// console.log(currentUser)
  // end


 

// const updatereq = async (user) => {
//   if (user) {
//     // User is signed in
//     console.log("userRef")
//     const userRef = doc(fireDB, "users", user.uid);
//     try {
//     const docSnap = await getDoc(userRef);
//       if (docSnap.exists()) {
//         await updateDoc(userRef, {
//             requestlimit: increment(3)
//           });
// }
//     } catch (error) {
//       console.log('Error getting user data:', error);
//     }
//   } else {
//     // User is signed out
//     setUserData(null);
//   }
// }

  // payment integration
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // const buyNow = async () => {
  //   if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
  //     return toast.error("All fields are required", {
  //       position: "top-center",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     })
  //   }

  //   const addressInfo = {
  //     name,
  //     address,
  //     pincode,
  //     phoneNumber,
  //     date: new Date().toLocaleString(
  //       "en-US",
  //       {
  //         month: "short",
  //         day: "2-digit",
  //         year: "numeric",
  //       }
  //     )
  //   }

  //   var options = {
  //     key: "rzp_test_Rkom9erIjatXik",
  //     key_secret: "9eOxCzB4eHshIabm20U0e5lD",
  //     amount: parseInt(50 * 100),
  //     currency: "INR",
  //     order_receipt: 'order_rcptid_' + name,
  //     name: "The GiftCase",
  //     description: "for testing purpose",
  //     handler: function (response) {
  //       console.log(response)
  //       toast.success('Payment Successful')

  //       const paymentId = response.razorpay_payment_id;

  //       const orderInfo = {
  //         cartItems,
  //         addressInfo,
  //         date: new Date().toLocaleString(
  //           "en-US",
  //           {
  //             month: "short",
  //             day: "2-digit",
  //             year: "numeric",
  //           }
  //         ),
  //         email: JSON.parse(localStorage.getItem("user")).user.email,
  //         userid: JSON.parse(localStorage.getItem("user")).user.uid,
  //         paymentId
  //       }

  //       try {
  //           updatereq();

  //         // const orderRef = collection(fireDB, 'order');
  //         // addDoc(orderRef, orderInfo);


          

  //       } catch (error) {
  //         console.log(error)
  //       }
  //     },

  //     theme: {
  //       color: "#3399cc"
  //     }
  //   };

  //   // var pay = new window.Razorpay(options);
  //   // pay.open();
  //   // console.log(pay)
  //   updatereq(user)


  // }



// payment Integration end


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !number || !msg) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, 'Request');
      await addDoc(productRef, {
        fname,
        lname,
        email,
        number,
        msg,
        agreed,
      });

      toast.success('Request sent successfully');
      setTimeout(() => {
        window.location.href = '/allproducts';
      }, 800);
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error submitting request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white-300 isolate px-6 py-24 sm:py-2 lg:px-8">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Submit Your Request</h1>
              <p className="mt-2 text-sm text-gray-600">Fill out the form below to send your request To make personalized gift</p>
            </div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  value={fname}
                  type="text"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  value={lname}
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                </div>
                <input
                  value={number}
                  type="tel"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  value={msg}
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  onChange={(e) => setMsg(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              ></input>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'SEND YOUR REQUEST'}
            </button>
          </div>
          <div>
          
          {/* {userData != null && (
              <h1>You got {userData.requestlimit} requests left</h1>
            )} */}


             {/* <div className="  text-center rounded-lg text-white font-bold">
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
              />
            </div> */}

          </div>
        </form>
      </div>
    </Layout>
  );
};
