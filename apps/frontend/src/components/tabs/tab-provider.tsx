'use client';

import { useSearchParams } from 'next/navigation';
import { ReactElement } from 'react';

import { cn } from '@/lib/utils';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type TabModel = {
  isDefault?: boolean;
  key: string;
  label: string;
  tiggerStyle?: string;
  children: ReactElement;
  visible?: boolean;
  contentStyle?: string;
};

export type TabProviderModel = {
  tabs: TabModel[];
  isHidden?: boolean;
  mainTabStyle?: string;
  tabListStyle?: string;
};

export default function TabProvider({ tabs, isHidden = false, mainTabStyle, tabListStyle }: TabProviderModel) {
  const searchParams = useSearchParams();

  const handleTabDefaultValue = () => {
    const tabKey = searchParams.get('tab');
    const providerDefault = tabs.find((tab) => tab.isDefault)?.key;

    if (tabKey !== null) return tabKey;
    if (providerDefault) return providerDefault;
    return 'details';
  };

  const visibleTabs = tabs.filter((tab) => tab.visible);

  return isHidden === false ? (
    <Tabs
      defaultValue={handleTabDefaultValue()}
      className={cn('w-full font-breuer-medium text-black flex flex-col gap-2', mainTabStyle)}
    >
      <TabsList
        className={cn(
          'inline-flex w-fit self-start',
          'bg-white rounded-t-xl shadow-md',
          'mb-2 max-h-10 overflow-hidden p-0 rounded-t-xl',
          tabListStyle
        )}
      >
        {visibleTabs.map((tab) => (
          <TabsTrigger
            key={`tab-trigger-${tab.key}`}
            value={tab.key}
            className={cn(
              'relative px-5 py-2 border-b-2 text-lg transition-colors duration-200',
              'data-[state=active]:text-[#ffffff] data-[state=active]:bg-[#8cc63f]',
              'hover:text-[#8cc63f] hover:border-[#8cc63f]',
              'min-w-[240px]',
              tab.tiggerStyle
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.key}
          value={tab.key}
          className={cn('w-full bg-white border-rounded rounded p-6 shadow-sm', tab.contentStyle)}
        >
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  ) : (
    <div />
  );
}
