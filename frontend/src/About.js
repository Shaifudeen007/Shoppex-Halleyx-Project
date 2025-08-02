import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-blue-100">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          About <span className="text-black">Shoppex</span>
        </h1>

        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          <strong className="text-blue-600">Shoppex</strong> is your one-stop
          destination for high-quality electronic devices at unbeatable prices.
          We are dedicated to making technology accessible to everyone by
          offering <span className="font-semibold text-blue-600">low-profit pricing</span>, 
          <span className="font-semibold text-blue-600"> regular deals</span>, and 
          <span className="font-semibold text-blue-600"> genuine products</span>.
        </p>

        <p className="mb-6 text-lg text-gray-700 leading-relaxed">
          Our curated catalog features the latest in mobile phones, laptops,
          accessories, and home electronics from trusted brands. At Shoppex, we
          believe in fair pricing — so you never overpay for what you need.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            What sets us apart?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
            <li>
              <strong className="text-blue-600">Low-Profit Products:</strong> We keep our margins minimal so you get maximum value.
            </li>
            <li>
              <strong className="text-blue-600">Trusted Quality:</strong> Every product is quality-checked and comes with verified warranty support.
            </li>
            <li>
              <strong className="text-blue-600">Regular Offers:</strong> Enjoy frequent discounts, bundle deals, and festive sales.
            </li>
            <li>
              <strong className="text-blue-600">Customer-Centric:</strong> Fast shipping, easy returns, and a responsive support team.
            </li>
          </ul>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed">
          At <span className="text-blue-600 font-semibold">Shoppex</span>, we’re not just selling electronics —
          we’re building a trustworthy tech-shopping experience for you.
          <br />
          <span className="block mt-2 font-semibold">Thank you for choosing us.</span>
        </p>
      </div>
    </div>
  );
};

export default About;
