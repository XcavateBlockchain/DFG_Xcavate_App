import { OverviewCard } from '@/components/cards/overview-card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IProfile, TokenOwnership } from '@/types';

type ProfileHeaderOverviewProps = {
  properties: TokenOwnership[];
  profile: IProfile | null;
};

export default function ProfileHeaderOverview({
  profile,
  properties
}: ProfileHeaderOverviewProps) {
  const totalTokensOwned = properties.reduce((total, item) => {
    return total + parseInt(item.tokensOwned, 10);
  }, 0);

  return (
    <>
      <div className="flex w-full flex-col gap-6">
        <div className="-mt-28 flex size-[155px] items-center justify-center rounded-full bg-white">
          <Image
            src={profile?.avatar ?? '/images/avatar.png'}
            alt="avatar"
            width={150}
            height={150}
            className="rounded-full bg-cover bg-no-repeat"
            priority
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <h1 className="font-mona text-[1.125rem]/[1.5rem] font-semibold">
                {profile
                  ? `${profile.credential.claim.contents.firstName}  ${profile.credential.claim.contents.lastName}`
                  : '- -'}
              </h1>
              <div className="flex items-center gap-2 rounded-lg bg-primary-200/10 px-2 py-[2px]">
                <span className="text-[0.875rem] text-primary-200">Investor</span>
              </div>
            </div>
            <span className="font-mona text-[0.875rem]/[1.5rem]">
              Account created May, 2024
            </span>
          </div>

          <Button variant={'outline'}>EDIT PROFILE</Button>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4">
        <OverviewCard title="Property tokens bought" value={totalTokensOwned} />
        <OverviewCard title="Total invested" value={'£75,000'} />
        <OverviewCard title="ROI" value={'10%'} />
        <OverviewCard title="Active loan" value={'£0'} />
      </div>
    </>
  );
}
