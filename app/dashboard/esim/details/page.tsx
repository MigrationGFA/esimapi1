import Carousel from "@/components/Dashboard/EsimDash/Carousel";

import Wowimg from "@/public/wow.png";
export default function ESIMDetails() {
  const images = [
    Wowimg,
    Wowimg,
    Wowimg,
    Wowimg,
    Wowimg,
    Wowimg,
    Wowimg,
    Wowimg,
  ];
  return (
    <div>
      <div>
        <Carousel images={images} autoPlay interval={5000} />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">UK eSIM</h3>
          <p className="text-gray-600">10 GB / 30 days</p>
          <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-md">
            Activate
          </button>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">France eSIM</h3>
          <p className="text-gray-600">5 GB / 15 days</p>
          <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-md">
            Activate
          </button>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold">Spain eSIM</h3>
          <p className="text-gray-600">15 GB / 30 days</p>
          <button className="mt-2 bg-blue-700 text-white px-4 py-2 rounded-md">
            Activate
          </button>
        </div>
        <div className="col-span-3 text-center text-gray-600">
          How to set up your eSIM?
        </div>
      </div> */}
    </div>
  );
}
