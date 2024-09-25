import FileInput, { MimeTypes } from '@/components/file-input';
import SelectInput from '@/components/select-input';
import Form, { useZodForm } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { getCookieStorage } from '@/lib/cookie-storage';
import { addFileToProperty, upsertProperty } from '@/lib/dynamo';
import {
  IPropertyInformationInput,
  propertyInformationSchema
} from '@/lib/validations/property-schema';
import { Option, STATE_STATUS } from '@/types';
import { toast } from 'sonner';
import { uploadFileToS3 } from '@/lib/s3';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const propertyTypes: Option[] = [
  {
    label: 'Apartment',
    value: 'Apartment'
  },
  {
    label: 'Flat',
    value: 'Flat'
  }
];

export default function PropertyInformationForm({ propertyId }: { propertyId: number }) {
  const router = useRouter();
  const [status, setStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);
  const [uploadStatus, setUploadStatus] = useState<STATE_STATUS>(STATE_STATUS.IDLE);

  const form = useZodForm({
    schema: propertyInformationSchema
  });

  async function onSubmit(data: IPropertyInformationInput) {
    setStatus(STATE_STATUS.LOADING);
    setUploadStatus(STATE_STATUS.LOADING);
    console.log('Started');
    try {
      const address = await getCookieStorage('accountKey');
      if (!address) {
        toast.error('Please connect your wallet');
        return;
      }
      const floorPlanBuffer = Buffer.from(await data.floor_plan.arrayBuffer());
      const salesBuffer = Buffer.from(await data.sales_agreement.arrayBuffer());
      const uploadFloorPlan = await uploadFileToS3(
        address,
        propertyId,
        'floor_plan',
        data.floor_plan.name,
        data.floor_plan.type,
        floorPlanBuffer
      );
      console.log('Uploaded floor');
      const uploadSales = await uploadFileToS3(
        address,
        propertyId,
        'sales_agreement',
        data.floor_plan.name,
        data.floor_plan.type,
        salesBuffer
      );
      console.log('uploaded sales');
      if (!uploadFloorPlan && !uploadSales) {
        setUploadStatus(STATE_STATUS.ERROR);
        toast.error('Failed to upload document please try again');
      } else {
        setUploadStatus(STATE_STATUS.SUCCESS);
        await addFileToProperty(address, propertyId, uploadFloorPlan);
        await addFileToProperty(address, propertyId, uploadSales);
        toast.success('Files uploaded');
        await upsertProperty(address, propertyId, { region: 0, location: 0, ...data });
        setStatus(STATE_STATUS.SUCCESS);
        router.push(`/property/create?id=${propertyId}&page=pricing-details`);
      }
    } catch (error: any) {
      toast.error(error.message);
      setStatus(STATE_STATUS.ERROR);
      console.log(error);
    }
  }

  // async function onSubmit(data: IPropertyInformationInput) {
  //   console.log(data);
  //   console.log(propertyId);
  //   router.push(`/property/create?id=${propertyId}&page=pricing-details`);
  // }

  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)} className="gap-[60px]">
      <Input type="string" label="Property name" {...form.register('property_name')} />
      {/* <div className="grid w-full grid-cols-2 gap-2">
        <SelectInput
          label="Region"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_region')}
        />
        <SelectInput
          label="Location"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_location')}
        />
      </div> */}
      <div className="grid w-full grid-cols-3 gap-2">
        <Input
          type="string"
          label="Property Address"
          placeholder="Street"
          {...form.register('address_street')}
        />
        <Input
          type="string"
          label="Town / City"
          placeholder="Town/City"
          {...form.register('address_town_city')}
        />
        <Input
          type="string"
          label="Postal Code"
          placeholder="Postal code"
          {...form.register('post_code')}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <Input
          type="string"
          label="Property number"
          placeholder="Postal code"
          {...form.register('property_number')}
        />
        <SelectInput
          label="Property Type"
          placeholder="select"
          options={propertyTypes}
          {...form.register('property_type')}
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-2">
        <Input
          type="string"
          label="local authority"
          placeholder="e.g"
          {...form.register('local_authority')}
        />
        <Input
          type="string"
          label="title deed number"
          placeholder="e.g"
          {...form.register('title_deed_number')}
        />
        <Input
          type="string"
          label="google map link"
          placeholder="e.g"
          {...form.register('map')}
        />
      </div>
      <div className="flex w-full flex-col">
        <span className="font-mona text-[18px]/[24px] font-semibold">Document</span>
        <Separator className="mb-8 mt-4" />
        <div className="flex items-center gap-2">
          <FileInput
            name="Upload Sales Agreement"
            types={[MimeTypes.PDF]}
            handleFileChange={files => {
              console.log(files); // Log the files to check if they are being passed correctly
              form.setValue('floor_plan', files[0]);
            }}
          />
          <FileInput
            name="Upload Floor plan"
            types={[MimeTypes.PDF]}
            handleFileChange={files => form.setValue('sales_agreement', files[0])}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <Button variant={'outline'} size={'md'}>
          Cancel
        </Button>
        <Button
          type="submit"
          size={'md'}
          className="text-white"
          disabled={
            !form.formState || !form.formState.isValid || status === STATE_STATUS.LOADING
          }
        >
          Continue
        </Button>
      </div>
    </Form>
  );
}
