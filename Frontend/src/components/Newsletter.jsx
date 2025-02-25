import React from 'react';

export default function Newsletter() {
  return (
    <section className="py-12 px-8 bg-[#D9DBF1]">
      <h2 className="text-3xl font-semibold text-center text-[#7D84B2] tracking-wide">
        Stay Updated with Our Newsletter
      </h2>
      <p className="text-center text-gray-700 mt-4 max-w-2xl mx-auto">
        Subscribe to receive the latest course updates, tips, and exclusive offers!
      </p>
      <div className="mt-6 flex justify-center">
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 w-full sm:w-auto rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7D84B2] focus:border-transparent mb-4 sm:mb-0"
          />
          <button
            type="submit"
            className="mt-4 sm:mt-0 sm:ml-4 px-6 py-3 bg-[#7D84B2] text-white rounded hover:bg-[#8E9DCC] transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
