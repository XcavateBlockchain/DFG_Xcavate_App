import { AppSiteHeader } from '@/components/layouts/app-site-header';
import SiteFooter from '@/components/layouts/site-footer';
import SubstrateContextProvider from '@/context/polkadot-contex';
import { getCookieStorage } from '@/lib/cookie-storage';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: Readonly<AppLayoutProps>) {
  const address = await getCookieStorage('accountKey');
  return (
    <SubstrateContextProvider>
      <div className="relative flex min-h-screen flex-col">
        <AppSiteHeader open={!address} />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </SubstrateContextProvider>
  );
}
