import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import FooterInfo from "@/templates/tailspark/landing/components/footer";
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/theme';  // 修正 ThemeProvider 的导入路径
import ClientLayout from './client-layout';  // 导入客户端布局组件

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams.locale;
  let messages;
  try {
    messages = (await import(`@/pagejson/${locale}.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClerkProvider>
        <div className="overflow-x-hidden antialiased bg-background text-foreground dark:bg-[#1c1817] dark:text-[#e7e5e4]">
          <NextTopLoader />
          <ThemeProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </ThemeProvider>
          <FooterInfo footer={messages.footer} />
        </div>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}