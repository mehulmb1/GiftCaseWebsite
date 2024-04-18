import React from 'react';
import Layout from '../layout/Layout';

function ContactUs() {
  return (
    <>
    <Layout>
    <div className="max-w-2xl mx-auto px-4 py-8 text-green-800">
      <h1 className="text-3xl font-bold mb-4"> Contact information</h1>
      <p className="text-lg mb-4">
        If you have any questions or inquiries, feel free to reach out to us:
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Phone Number:</h2>
        <p>9028884038</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Email:</h2>
        <p>the.giftcase1@gmail.com</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Physical Address:</h2>
        <p>DP Enterprises, C/o Mahadev Puliwale, Plot No 12, Near Kala Maroti Mandir, 440027 Nagpur MH, India</p>
      </div>
    </div>
    </Layout>
        </>
  );
}

export default ContactUs;
