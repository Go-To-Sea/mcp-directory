"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from 'next/link';
import { useLocale } from 'next-intl';

const HeroSection = () => {
  const locale = useLocale();
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
            <p className="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.</p>
          </div>
          <div className="mt-10">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Summer Style 1</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://tailwindui.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                        alt="Summer style 1"
                        width={176}
                        height={256}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-gray-500">Description for Summer Style 1</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Summer Style 2</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://tailwindui.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                        alt="Summer style 2"
                        width={176}
                        height={256}
                        className="object-cover"
                      />
                    </div>
                    <p className="text-gray-500">Description for Summer Style 2</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              {/* Add more AccordionItems as needed */}
            </Accordion>
            <Link href={`/${locale}/collection`} className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Shop Collection</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;