import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';

const UserDetails = () => {
  const context = useContext(myContext);
  const { mode,currentUser,userData } = context;
  
  console.log("hey",userData)

  return (
    <Layout>
  
      <div className="flex justify-center items-center h-full">
        <div className={`bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg ${mode === 'dark' ? 'bg-black' : 'bg-black'}`}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className={`text-lg leading-6 font-medium ${mode === 'dark' ? 'text-black' : 'text-gray-900'}`}>
              User Profile
            </h3>
            <p className={`mt-1 max-w-2xl text-sm ${mode === 'dark' ? 'text-black' : 'text-gray-500'}`}>
              Details and information about the user.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className={`bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <dt className="text-sm font-medium text-gray-500">
                  Full name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.name}
                </dd>
              </div>
              <div className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <dt className="text-sm font-medium text-gray-500">
                  Contact
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.number}
                </dd>
              </div>
              <div className={`bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.email}
                </dd>
              </div>
              {/* <div className={`bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <dt className="text-sm font-medium text-gray-500">
                  Salary
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  $10,000
                </dd>
              </div> */}
              <div className={`bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <dt className="text-sm font-medium text-gray-500">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userData.address}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    
    </Layout>
  );
}

export default UserDetails;
