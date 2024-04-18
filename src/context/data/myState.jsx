import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { Timestamp, addDoc, getDoc ,collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import 'firebase/firestore';
import { DocumentReference } from 'firebase/firestore/lite';


function myState(props) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    // const[request,setRequest]=useState({
    //     fname:null,
    //     lname:null,
    //     number:null,
    //     msg:null,
    //     email:null
    // })
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        quantity:null,
        newcollection:null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    // ADD Request
    // const AddRequest = async () => {
    //     if (request.fname == null || request.lname == null || request.number == null || request.msg == null || request.email == null) {
    //         return toast.error("all fields are required")
    //     }

    //     setLoading(true)

    //     try {
    //         const productRef = collection(fireDB, 'Request');
    //         await addDoc(productRef, Request)
    //         toast.success("Request Sent successfully");
    //         setTimeout(() => {
    //             window.location.href = ''
    //         }, 800);
    //         getProductData();
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //     }
    //     // setProducts("")


    // }


    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("all fields are required")
        }

        setLoading(true)

        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, products)
            toast.success("Add product successfully");
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        // setProducts("")


    }

    const [product, setProduct] = useState([]);

    const getProductData = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setProduct(productArray);
                setLoading(false)
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        getProductData();
    }, []);

    // update product function

    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', products.id), products)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 800);
            getProductData();
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete product

    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success('Product Deleted successfully')
            getProductData();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [request, setRequest] = useState([]);

    const getRequestData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "Request"))
            const RequestArray = [];
            // window.alert("hey",result)
            console.log("heyyy",result)
            result.forEach((doc) => {
                const docID = doc.id;
                const docData = doc.data();
                const requestDataWithID = { ...docData, id: docID };
                RequestArray.push(requestDataWithID);
                setLoading(false)
            });
            setRequest(RequestArray);
            console.log("hey",RequestArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
// delete req
    const deleteRequest = async (item) => {
        const parentCollectionRef = item.id;

        if ( !item) {
            throw new Error("Invalid item");
        }else if(!item.id){
            throw new Error("Invalid id");
        }
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'Request', item.id))
        toast.success('Request Deleted successfully')
        getRequestData();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}








// user current
const[currentUser,setCurrentUser]=useState();
const [userData, setUserData] = useState(null); // State to hold user data

  const handleAuthStateChange = async (user) => {
    if (user) {
      // User is signed in
      setCurrentUser(user);
      const userRef = doc(fireDB, "users", user.uid);

      try {
        const docSnap = await getDoc(userRef); // Corrected to getDoc and added await
        if (docSnap.exists()) {
          // User data found, set state
          setUserData(docSnap.data());
        } else {
          // No user data available
          console.log('No user data available');
        }
      } catch (error) {
        console.log('Error getting user data:', error);
      }
    } else {
      // User is signed out
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);

    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => unsubscribe();
  }, []);




// upload item to cart of firebase

const[cartitem,setCartItems]=useState([])

const addtocartfirebase = async (item, uid) => {
    if (!currentUser) {
        return toast.error("Signup first");
    }
    setLoading(true);
    try {
        const userCartRef = collection(fireDB, 'cart' + currentUser.uid);
    //    { // await addDoc(userCartRef, item);

    //     // const userDocRef = collection(fireDB, "cart");
    //     // const userCartRef = doc(fireDB, "cart/"+ currentUser.uid);


    //     // const userCartRef = collection(userDocRef,currentUser.uid);
    //    }
        await addDoc(userCartRef, item);
        setCartItems([...cartitem, item]);
        console.log("cart",cartitem)
        // await addDoc(userCartRef, { ...item, id: customDocId });

        toast.success("Added product successfully",item.id);
        setLoading(false);
    } catch (error) {
        console.error("Error adding product:", error);
        setLoading(false);
    }
};

const[cart,setcart]=useState([])

const getFromCartFirebase = async (id) => {
    try {
        // Construct a query to retrieve cart items for the user
        const userCartRef = collection(fireDB, `cart${id}`);

        // Get a snapshot of the documents in the user's cart collection
        const querySnapshot = await getDocs(userCartRef);
        // Process the snapshot to extract the data
        const cartItems = [];
        
        querySnapshot.forEach((doc) => {
            const itemData = doc.data();
            console.log("Item data:", itemData); // Log each item's data
            cartItems.push(itemData);
        });
        setcart(cartItems)
        return cartItems;
    } catch (error) {
        console.error("Error fetching cart data:", error);
        throw error;
    }
};


// delete from cart
const deleteFromCartFirebase = async (item,id) => {
    try {
        const querySnapshot = await getDocs(collection(fireDB, "cart"+id));
        
        for (const doc of querySnapshot.docs) {
            if(doc.data().id===item){
                await deleteDoc(doc.ref)
                break;
            }
        }
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  };
// end


const clearcartfromFirebase = async (userId) => {
    try {
      // Construct the reference to the document to be deleted
      const querySnapshot = await getDocs(collection(fireDB, "cart"+userId));
        // Delete each document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

      toast.success("Cart Cleaned")
    } catch (error) {
      console.error("Error deleting document: ", error);
      throw error;
    }
  };



    useEffect(() => {
        getOrderData();
        getUserData();
        getRequestData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')

    return (
        <MyContext.Provider value={{
            mode, toggleMode, loading, setLoading,
            products, setProducts, addProduct, product,
            edithandle, updateProduct, deleteProduct, order,
            user,request,deleteRequest, searchkey, setSearchkey,filterType,setFilterType,
            filterPrice,setFilterPrice,addtocartfirebase,getFromCartFirebase,currentUser,
            setCurrentUser,userData,setUserData,deleteFromCartFirebase,
            clearcartfromFirebase,cart
            
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState