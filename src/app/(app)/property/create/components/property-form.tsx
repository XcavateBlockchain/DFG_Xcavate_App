'use client';

import { Icons } from '@/components/icons';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
// import { v4 as uuidv4 } from 'uuid';
import PropertyInformationForm from './property-informtion-form';
import PricingDetailsForm from './pricing-details-form';
import PropertyFeaturesForm from './property-features-form';

export default function PropertyForm() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id') ?? Date.now();
  const step = searchParams.get('page') ?? 'property-information';

  const current: any = {
    'property-information': 0,
    'pricing-details': 1,
    'property-features': 2
  };

  const steps = [
    <PropertyInformationForm propertyId={Number(propertyId)} />,
    <PricingDetailsForm propertyId={Number(propertyId)} />,
    <PropertyFeaturesForm />
  ];

  return (
    <>
      <section className="flex w-full items-center justify-between gap-2">
        <button className="flex items-center gap-2 font-mona text-[18px]/[24px]">
          <span className="size-10 rounded-lg border border-primary p-3.5">
            <Icons.back className="size-3" />
          </span>
          Back
        </button>

        <div className="flex items-center">
          <Step
            current={current[step] === 0}
            passed={current[step] !== 0}
            step={1}
            title="Property information"
          />
          <Icons.arrowRight className="size-8" />
          <Step
            current={current[step] === 1}
            passed={current[step] > 1}
            step={2}
            title="Pricing details"
          />
          <Icons.arrowRight className="size-8" />
          <Step
            current={current[step] === 2}
            passed={current[step] > 2}
            step={3}
            title="Additional details"
          />
        </div>
      </section>
      <section className="w-full bg-[#FAFAFA] px-[42px] py-10">{steps[current[step]]}</section>
    </>
  );
}

function Step({
  current,
  step,
  title
}: {
  current: boolean;
  title: string;
  step: any;
  passed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'flex size-7 items-center justify-center rounded-full border font-mona text-[14px]/[13.5px] font-semibold',
          {
            'border-primary text-primary': current
          }
        )}
      >
        {step}
      </span>
      <span className="font-sans text-[14px]/[24px]">{title}</span>
    </div>
  );
}
