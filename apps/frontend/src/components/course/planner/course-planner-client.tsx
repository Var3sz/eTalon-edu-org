'use client';

import CoursePlanData from '@/components/course/planner/course-plan-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CoursePlannerClient() {
  return (
    <div className='w-full h-screen p-6 bg-background text-foreground'>
      <Tabs defaultValue='course-planning' className='w-full h-full flex flex-col'>
        <TabsList className='mb-4 flex self-start gap-2'>
          <TabsTrigger
            value='course-planning'
            className='text-lg px-6 py-3 rounded-md border shadow transition-all font-semibold bg-white text-muted-foreground data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:border-gray-700'
          >
            Kurzustervezés
          </TabsTrigger>
          <TabsTrigger
            value='packages'
            className='text-lg px-6 py-3 rounded-md border shadow transition-all font-semibold bg-white text-muted-foreground data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:border-gray-700'
          >
            Csomagok
          </TabsTrigger>
          <TabsTrigger
            value='billing-dates'
            className='text-lg px-6 py-3 rounded-md border shadow transition-all font-semibold bg-white text-muted-foreground data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:border-gray-700'
          >
            Számlázási dátumok
          </TabsTrigger>
          <TabsTrigger
            value='course-dates'
            className='text-lg px-6 py-3 rounded-md border shadow transition-all font-semibold bg-white text-muted-foreground data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:border-gray-700'
          >
            Kurzus dátumok
          </TabsTrigger>
        </TabsList>

        <div className='flex-1 overflow-y-auto rounded-xl border p-4 shadow-sm'>
          <TabsContent value='course-planning'>
            <CoursePlanData />
          </TabsContent>
          <TabsContent value='packages'>
            <div className='text-xl font-semibold'>Csomagok tartalom ide jön</div>
          </TabsContent>
          <TabsContent value='billing-dates'>
            <div className='text-xl font-semibold'>Számlázási dátumok tartalom ide jön</div>
          </TabsContent>
          <TabsContent value='course-dates'>
            <div className='text-xl font-semibold'>Kurzus dátumok tartalom ide jön</div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
