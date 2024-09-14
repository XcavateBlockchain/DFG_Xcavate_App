import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { properties } from '@/config/property';
import { getPropertyDetails, getTokenRemaining } from '@/lib/queries';
import { Property } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
// import "/public/images/new_coin.png" from "@/assets/New_coin.png";
import BuyToken from './_components/buy-token';
import { PropertyStatsWithInput } from './_components/PropertyStatsWithInput';
interface FetchedProperty {
  [key: string]: any;
}

export default async function Page({ params }: { params: { assetId: string } }) {
  const tokensRemaining = await getTokenRemaining(Number(params.assetId));
  const propertyIfo = (await getPropertyDetails(Number(params.assetId))) as FetchedProperty;
  const property = properties.find((property: Property) => property.id === params.assetId);
  if (!property) {
    return <div></div>;
  }

  const { images } = property;

  const ARI = property.estimated_rental_income * 12;
  const APY = ARI / property.property_price;

  return (
    <>
      <div className="w-full space-y-16">
        <div className="container mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col items-start justify-start gap-16  px-4 py-20 md:px-10">
          <Button variant={'text'} asChild>
            <Link href={'/marketplace'}>
              <Icons.back className="size-2.5" /> Back
            </Link>
          </Button>
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <div className="flex w-full flex-col overflow-hidden md:w-1/2">
              <img
                src={property.property_image}
                alt="Property Image"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="mx-auto mt-4 flex gap-3">
                {images.map((image: any) => (
                  <div
                    key={image}
                    className="h-12 w-12 overflow-hidden rounded-sm border shadow-md"
                  >
                    <img
                      src={image}
                      alt="Property Image"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex  w-full flex-col items-start justify-start gap-5 md:w-1/2">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={'/images/new_coin.png'}
                    alt="logo"
                    width={54}
                    height={54}
                    className="border-spacing-3 rounded-full border-[#A6A6A6]"
                    priority
                  />
                  <h3 className="font-mona text-[18px]/[24px] font-semibold">Gade homes</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant={'text'} size={'icon'}>
                    <Icons.heart className="size-8" />
                  </Button>
                  <Button variant={'text'} size={'icon'}>
                    <Icons.share className="size-5" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-1">
                <Image
                  src={'/icons/pin_location.svg'}
                  alt="loc"
                  width={24}
                  height={24}
                  className="pointer-events-none"
                />
                <h3 className="font-mona text-[16px]/[24px] font-semibold">
                  {property.address_street} {property.address_town_city}
                </h3>
              </div>
              <h1 className="font-mona text-[24px]/[32px] font-bold">
                {property.property_name}
              </h1>
              <div className="w-full space-y-2 ">
                <p className="text-[14px]/[24px]">Price</p>
                <div className="flex w-full items-center justify-between  gap-1 text-[16px]/[24px] font-medium">
                  <h4 className="font-mona text-[24px]/[32px] font-bold">
                    £{propertyIfo.tokenPrice}
                  </h4>{' '}
                  <BuyToken
                    listingId={Number(params.assetId)}
                    tokens={tokensRemaining}
                    property={propertyIfo}
                    data={property}
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-3 gap-10">
                <PropertyStats title="Price per Token" value={propertyIfo.tokenPrice} />
                <PropertyStats title="Rental Yield" value={`${APY}%`} />
                <PropertyStats
                  title="Tokens available"
                  value={`${tokensRemaining} / ${propertyIfo.tokenAmount}`}
                />
              </div>
              <div className="grid w-full grid-cols-3 gap-10">
                <PropertyStats title="Property type " value={property.property_type} />

                <PropertyStatsWithInput
                  title="Similar property prices"
                  start="£200,000"
                  mid=""
                  end="£270,000"
                />

                <PropertyStats
                  title="Rental income"
                  value={`${property.estimated_rental_income} pcm`}
                />

                <PropertyStatsWithInput
                  title="Area rental demand"
                  start="Low"
                  end="High"
                  mid="Medium"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex w-full max-w-screen-2xl flex-col items-start justify-start gap-8 bg-[#F4F4F4] px-4 py-16 md:px-10 lg:flex-row">
          <div className="flex w-full flex-col items-start gap-[45px] md:w-1/2">
            <div className="space-y-4 text-[18px]/[24px]">
              <h1 className="font-mona  font-semibold text-[#4E4E4E]">Property Description</h1>
              <p className=" text-[#191A1BD9]">{property.description}</p>
            </div>
            <div className="w-full space-y-4">
              <h1 className="font-mona  font-semibold text-[#4E4E4E]">Details</h1>
              <PropertyInfo title="Blocks" value={property.area} />
              <PropertyInfo title="Bedrooms" value={property.no_of_Bedrooms} />
              <PropertyInfo title="Bathrooms" value={property.number_of_bathrooms} />
              <PropertyInfo title="Type" value={property.property_type} />
              <PropertyInfo
                title="Location"
                value={`${property.address_street} ${property.address_town_city}`}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start md:w-1/2">
            <h1 className="font-bold">MAP</h1>
            <Image
              src={'/images/map.png'}
              alt="map"
              width={630}
              height={424}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="mt-10 flex w-full flex-col overflow-x-scroll px-4 md:px-20">
          <h1 className="mb-4 text-xl text-[#4E4E4E]">Item Activity</h1>
          <table className="min-w-full border-separate border-spacing-x-2 border-spacing-y-2 border-t-2 border-gray-200">
            <thead className="border-b lg:table-header-group">
              <tr>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                  Action
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                  From
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                  Trade Price
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                  To
                </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:text-xl">
                  Date
                </td>
              </tr>
            </thead>
            <tbody className="lg:border-gray-300">
              <tr>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $29.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $29.00
                </td>
              </tr>
              <tr>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $59.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $29.00
                </td>
                <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:text-lg">
                  $29.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const PropertyStats = ({ title, value }: { title: string; value: any }) => (
  <dl className="flex w-full flex-col items-start gap-2 border-t border-gray-200 pt-3.5 text-[14px]/[24px]">
    <dt className="text-[#4E4E4E]">{title}</dt>
    <dd className="text-[#717171]">{value}</dd>
  </dl>
);

const PropertyInfo = ({ title, value }: { title: string; value: any }) => (
  <ul className="flex w-full items-center justify-between border-t border-gray-200 p-3.5 text-[18px]/[24px]">
    <li className="text-[#717171]">{title}</li>
    <li className="text-[#4E4E4E]">{value}</li>
  </ul>
);
