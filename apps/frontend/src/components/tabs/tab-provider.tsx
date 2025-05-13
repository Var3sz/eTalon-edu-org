import { useSearchParams } from 'next/navigation';
import { ReactElement } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

type TabModel = {
  isDefault?: boolean;
  key: string;
  label: string;
  tiggerStyle?: string;
  children: ReactElement;
  visible?: boolean;
  warning?: boolean;
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

  return isHidden ? null : (
    <Tabs
      defaultValue={handleTabDefaultValue()}
      className={cn(
        // ha inkább gap-et használnál:
        'w-full px-64 font-breuer-medium text-black flex flex-col gap-2',
        mainTabStyle
      )}
    >
      <TabsList className={cn('bg-white rounded-t-xl shadow-md', 'mb-2', 'max-h-10 overflow-hidden', tabListStyle)}>
        {tabs.map(
          (tab) =>
            tab.visible && (
              <TabsTrigger
                className={cn(
                  'relative px-5 py-2 border-b-2 text-lg transition-colors duration-200',
                  'data-[state=active]:text-[#ffffff] data-[state=active]:bg-[#8cc63f]',
                  'hover:text-[#8cc63f] hover:border-[#8cc63f] w-full',
                  tab.tiggerStyle
                )}
                key={`contract-tab-trigger-${tab.key}`}
                value={tab.key}
              >
                {tab.label}
                {tab.warning && <AlertTriangle size={20} className='text-yellow-500 ml-2' />}
              </TabsTrigger>
            )
        )}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent
          key={tab.key}
          value={tab.key}
          className='bg-white border-rounded  border-gray-300 rounded p-6 shadow-sm'
        >
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
