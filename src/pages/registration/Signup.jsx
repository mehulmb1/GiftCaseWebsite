import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection,getFirestore, doc, setDoc } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [addrs, setAddrs] = useState("");

    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading,currentUser } = context;

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // User signed up successfully
              const user = userCredential.user;
              const userId = user.uid;
          
              // Add additional user data to Firestore
              const userRef = doc(fireDB, 'users', userId);
              setDoc(userRef, {
                bio: 'trying',
                name: name,
                email: email,
                addrs:addrs,
                contact:contact,
                time : Timestamp.now(),
                role:"user",
                requestlimit:3
              })
              .then(() => {
                console.log("User data added to Firestore successfully");
              })
              .catch((error) => {
                console.error("Error adding user data to Firestore: ", error);
              });
            })
            .catch((error) => {
              // Handle errors
              console.error("Error creating user: ", error);
            });

            // console.log(users)

            const user = {
               
            }
            // const userRef = collection(fireDB, "users")
            // const userRefanother = collection(userRef,users.user.uid)
            // await addDoc(userRefanother, user);

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);

            
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setContact("");
            setAddrs("");

            setPassword("");
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className="flex flex-wrap w-full justify-center">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="absolute top-0 pt-12 md:pl-12 md:-mb-24">
                        <Link to={'/'} className="p-4 text-xl font-bold text-white bg-black">
                            The GiftCase.
                        </Link>
                    </div>
        <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p class="text-3xl text-center">
                Welcome.
            </p>
            {/* <form class="flex flex-col pt-3 md:pt-8"> */}
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
                            <path d="M12 14c4.418 0 8 1.79 8 4v2H4v-2c0-2.21 3.582-4 8-4z" />
                            </svg>

                        </span>
                        <input type="text" id="design-login-email" onChange={(e) => setName(e.target.value)} class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                </path>
                            </svg>
                        </span>
                        <input type="text" id="design-login-email" onChange={(e) => setEmail(e.target.value)}  class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg
                                width="10"
                                height="20"
                                viewBox="0 0 100 200"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <rect x="10" y="20" width="80" height="160" rx="10" fill="#333" />
                                <rect x="30" y="10" width="40" height="5" rx="2.5" fill="#666" />
                                <circle cx="50" cy="15" r="2" fill="#666" />
                                <rect x="20" y="30" width="60" height="130" rx="5" fill="#fff" />
                                </svg>
                        </span>
                        <input type="number" id="design-login-email" onChange={(e) => setContact(e.target.value)}  class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Contact Number"/>
                        </div>
                    </div>

                    <div className="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M12 2a9 9 0 0 1 9 9c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 9-9z" />
                            <circle cx="12" cy="10" r="3" />
                            </svg>

                        </span>
                        <input type="text" id="design-login-email" onChange={(e) => setAddrs(e.target.value)}  class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Address"/>
                        </div>
                    </div>
                    
                    <div class="flex flex-col pt-4 mb-12">
                        <div class="flex relative ">
                            <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                    </path>
                                </svg>
                            </span>
                            <input type="password" id="design-login-password"   onChange={(e) => setPassword(e.target.value)} class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                            </div>
                        </div>
                        <button onClick={signup} type="submit" class="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span class="w-full" >
                                Submit
                            </span>
                        </button>
                    {/* </form> */}
                    <div class="pt-12 pb-12 text-center">
                        <p>
                            Already have an account?
                            <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
          
</div>

        </div>
    )
}

export default Signup