import React from 'react';
import Layout from '../layout/Layout';

function RefundPolicy() {
  return (
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl px-8 py-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Cancellation Policy:</h2>
          <p className="mb-4">
            <strong>How do I cancel an order on www.thegiftcase.in?</strong>
            <br />
            If your order or the specific item(s) you intend to cancel haven't been dispatched yet, reach out to us promptly via phone call or WhatsApp at 9028884038. Our customer service hours are Monday to Saturday, from 10 AM to 6 PM.
            <br />
            Upon receiving your cancellation request, we will process it promptly. If the order has not been shipped, it will be cancelled, and the refunded amount will be initiated.
            <br />
            The refunded amount will be credited back to your account within 24-48 business hours after the cancellation request has been duly processed by our team.
          </p>
          <p>
            <strong>Can the company cancel the order?</strong>
            <br />
            Certainly, there are situations where The Giftcase may need to cancel an order. Even if you receive an order confirmation, it doesn't guarantee our final acceptance of your order. www.thegiftcase.in reserves the right to accept or decline your order for various reasons.
            <br />
            While our online inventory is designed to update automatically, there may be instances where we need to notify you of a shortage in the quantity you ordered. In such cases, we have the option to either provide you with a reduced quantity or cancel the order, and we will inform you in advance via phone, email, or text message. Your understanding in such situations is appreciated.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Returns, Replacement and Refunds:</h2>
          <p className="mb-4">
            <strong>How do I return an item purchased on The Giftcase?</strong>
            <br />
            To facilitate a smooth return process for our valued customers, The Giftcase provides an "Easy Return Policy." You can initiate a return or exchange request for a product within 5 days of its delivery. We also accommodate partial returns, allowing you to request a return for one or multiple products from your order.
            <br />
            To begin the return process, please contact our customer care hotline at 9028884038 (available Monday to Saturday, 10 AM to 6 PM) or send us a WhatsApp message with your Order ID. Additionally, kindly capture a photograph of the product and share it with us via WhatsApp for reference.
            <br />
            Our commitment to customer satisfaction includes a hassle-free pickup service scheduled within 2-4 business days. The refund or replacement process will be initiated promptly upon receiving the product at our end, provided it is unused and undamaged. Your convenience and satisfaction are our top priorities throughout the return process.
          </p>
          <p>
            <strong>Under what conditions is the product NOT eligible for Returns?</strong>
            <br />
            The product is not eligible for returns under the following conditions:
            <ul>
              <li>If the product has been used or altered.</li>
              <li>If the product is damaged due to misuse or overuse.</li>
              <li>If returned without its original packaging, including price tags, labels, original packing, freebies, and other accessories, or if the original packaging is damaged.</li>
              <li>If the serial number is tampered with.</li>
              <li>If the return request is initiated after 5 business days from the date of order delivery.</li>
              <li>If the product received was a free item provided by the brand.</li>
            </ul>
            Please ensure that the product meets our return criteria to facilitate a smooth return process.
          </p>
          <p>
            <strong>Categories not eligible for returns</strong>
            <br />
            Certain categories are not eligible for returns, including:
            <ul>
              <li>All personal care products, such as perfumes, body mists, body lotions, body wash, body oils, massage oils, soaps, etc.</li>
              <li>Personalized products where your name or photos are used.</li>
              <li>Edible items are also not eligible for returns.</li>
            </ul>
            Please be aware of these specific categories, as they fall outside the scope of our return policy.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">What if the product is received in damaged condition?</h2>
          <p className="mb-4">
            If you receive a product in a damaged or tampered condition, kindly return the package to the delivery person before accepting it. In the rare event that any product you ordered is not in good condition, is damaged, or defective, please contact our customer care hotline at 9028884038 (available Monday to Saturday, 10 AM to 6 PM) or send us a WhatsApp message with your Order ID. Additionally, capture a photograph or video of the damaged/defective product and email it to us for reference.
            <br />
            We prioritize resolving such issues promptly. You are eligible for a refund or a brand new replacement at no extra cost for all valid complaints. Please note that the availability of stock determines the feasibility of a replacement. If a replacement is not available, we will refund you the full amount. Your satisfaction is our priority, and we appreciate your cooperation in ensuring a smooth resolution.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Can I return part of my order?</h2>
          <p className="mb-4">
            Certainly, you have the flexibility to return specific items from your order. You can create a return request at the individual item level, allowing you to initiate the return, replacement, or refund process for any particular item within a multiple-item order. It's important to note that when returning a product, it must be returned in its entirety, including all components and any complimentary gifts or products that were included with it.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">How will I get refunded for the returned orders and how long will this process take?</h2>
          <p>
            For returns, replacements, or refunds, the refund process is initiated once the returned products are received and verified at our warehouse.
            <br />
            If you have any inquiries or concerns about the refund process, please don't hesitate to reach out to us during our business hours. We are dedicated to providing a smooth and satisfactory experience for our valued customers.
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export default RefundPolicy;
