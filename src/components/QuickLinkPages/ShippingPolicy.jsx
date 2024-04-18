import React from 'react';
import Layout from '../layout/Layout';

function ShippingPolicy() {
  return (
        <Layout>
            <div className="max-w-2xl mx-auto px-4 py-8 text-gray-800">
            <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
            <p className="mb-4">
                Welcome to The Giftcase. Please go through our shipping policies below to ensure a smooth and enjoyable shopping experience.
            </p>
            <ol className="list-decimal list-inside">
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Processing Time:</h2>
                <p>Orders are typically processed within 3-5 business days after payment confirmation. Customized or personalized items may require additional processing time.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Shipping Methods:</h2>
                <p>For domestic buyers, orders are shipped through registered domestic courier companies such as Bluedart, DTDC, Delhivery, Anjani, Tirupathi, or similar and /or speed post only. Delivering of the shipment is subject to Courier Company / post office norms. The Giftcase is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Shipping Rates:</h2>
                <p>Shipping rates are calculated at checkout based on the destination, weight, and shipping method selected.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Order Tracking:</h2>
                <p>Tracking information will be provided once the order has been shipped. Track your order through our website or the respective carrier's tracking system.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Incomplete or Incorrect Addresses:</h2>
                <p>Please provide accurate shipping information during checkout. We are not responsible for delays or non-delivery due to incorrect or incomplete addresses provided by the customer.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Lost or Stolen Packages:</h2>
                <p>The Giftcase is not responsible for lost or stolen packages after they have been marked as delivered by the carrier. Contact the carrier directly to resolve such issues.</p>
                </li>
                <li className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Returns Due to Non-Delivery:</h2>
                <p>If a package is returned to us due to non-delivery, customers are responsible for the cost of re-shipping. Refunds are not issued for shipping costs on returned packages.</p>
                </li>
            </ol>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Contact Information:</h2>
                <p>For any shipping-related inquiries, please contact our customer support at <a href="mailto:the.giftcase1@gmail.com" className="text-green-800 underline">the.giftcase1@gmail.com</a>.</p>
            </div>
            <p className="mt-8">
                Thank you for choosing The Giftcase. We hope our gifts bring joy and warmth to your special moments!
            </p>
            </div>
    </Layout>

  );
}

export default ShippingPolicy;
