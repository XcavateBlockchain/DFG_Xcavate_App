import { Property } from '@/types';
import Image from 'next/image';

export default function AdNFTCard({ ...data }: Property) {
  return (
    <div className="relative flex h-full w-full flex-col gap-6 bg-white pb-6 shadow-property-card">
      <Image
        src={data.property_image}
        alt=""
        width={295}
        height={190}
        className="h-[190px] w-full"
        priority
      />
      <div className="absolute left-[130px] top-[165px] flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <circle cx="5" cy="5" r="5" fill="white" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <circle cx="4" cy="4" r="3.6" stroke="white" strokeWidth="0.8" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
        >
          <circle cx="4" cy="4" r="3.6" stroke="white" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative w-full space-y-4 px-4">
        <div className="flex gap-2">
          <Image
            src={'/icons/pin_location.svg'}
            alt="loc"
            width={24}
            height={24}
            className="pointer-events-none"
          />
          <h3 className="text-[1rem]/[1.5rem]">
            {data.address_street} {data.address_town_city}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <dt>{data.property_name}</dt>
          <dd className="">APY 10%</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Token 100</dt>
          <dd className="">Price {data.property_price}</dd>
        </div>
      </div>
    </div>
  );
}
