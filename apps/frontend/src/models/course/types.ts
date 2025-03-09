export type Course = {
  id: string;
  type: string;
  grade: string;
  date: string;
  from: string;
  to: string;
  location: string;
  headcount: number;
  maxHeadcount: number;
};

export const courses: Course[] = [
  {
    id: 'WS_SZO_20250220_ER_01',
    type: 'Szóbeli előkészítő',
    grade: '4. osztály',
    date: '2025-03-08',
    from: '17:00',
    to: '19:00',
    location: 'ER',
    headcount: 17,
    maxHeadcount: 20,
  },
  {
    id: 'WS_SZO_20250215_ER_02',
    type: 'Matek',
    grade: '4. osztály',
    date: '2025-02-23',
    from: '14:00',
    to: '16:00',
    location: 'ER',
    headcount: 15,
    maxHeadcount: 20,
  },
  {
    id: 'WS_SZO_20250310_BUD_01',
    type: 'Történelem',
    grade: '5. osztály',
    date: '2025-03-10',
    from: '10:00',
    to: '12:00',
    location: 'BUD',
    headcount: 12,
    maxHeadcount: 18,
  },
  {
    id: 'WS_SZO_20250312_DEB_02',
    type: 'Fizika',
    grade: '6. osztály',
    date: '2025-03-12',
    from: '15:30',
    to: '17:30',
    location: 'DEB',
    headcount: 8,
    maxHeadcount: 15,
  },
  {
    id: 'WS_SZO_20250405_GYO_01',
    type: 'Kémia',
    grade: '7. osztály',
    date: '2025-04-05',
    from: '13:00',
    to: '15:00',
    location: 'GYO',
    headcount: 14,
    maxHeadcount: 20,
  },
  {
    id: 'WS_SZO_20250408_SZE_01',
    type: 'Angol',
    grade: '8. osztály',
    date: '2025-04-08',
    from: '16:00',
    to: '18:00',
    location: 'SZE',
    headcount: 9,
    maxHeadcount: 12,
  },
  {
    id: 'WS_SZO_20250315_BUD_02',
    type: 'Biológia',
    grade: '5. osztály',
    date: '2025-03-15',
    from: '11:00',
    to: '13:00',
    location: 'BUD',
    headcount: 18,
    maxHeadcount: 20,
  },
  {
    id: 'WS_SZO_20250322_PEC_01',
    type: 'Német',
    grade: '6. osztály',
    date: '2025-03-22',
    from: '14:30',
    to: '16:30',
    location: 'PEC',
    headcount: 7,
    maxHeadcount: 10,
  },
  {
    id: 'WS_SZO_20250325_MIS_01',
    type: 'Magyar',
    grade: '4. osztály',
    date: '2025-03-25',
    from: '09:00',
    to: '11:00',
    location: 'MIS',
    headcount: 20,
    maxHeadcount: 20,
  },
  {
    id: 'WS_SZO_20250410_SZE_02',
    type: 'Rajz',
    grade: '7. osztály',
    date: '2025-04-10',
    from: '15:00',
    to: '17:00',
    location: 'SZE',
    headcount: 6,
    maxHeadcount: 15,
  },
  {
    id: 'WS_SZO_20250329_BUD_03',
    type: 'Testnevelés',
    grade: '5. osztály',
    date: '2025-03-29',
    from: '12:00',
    to: '14:00',
    location: 'BUD',
    headcount: 10,
    maxHeadcount: 25,
  },
  {
    id: 'WS_SZO_20250412_VES_01',
    type: 'Informatika',
    grade: '8. osztály',
    date: '2025-04-12',
    from: '10:00',
    to: '12:00',
    location: 'VES',
    headcount: 11,
    maxHeadcount: 15,
  },
  {
    id: 'WS_SZO_20250415_BEK_01',
    type: 'Földrajz',
    grade: '7. osztály',
    date: '2025-04-15',
    from: '14:00',
    to: '16:00',
    location: 'BEK',
    headcount: 13,
    maxHeadcount: 18,
  },
];

export type Student = {
  courseId: string;
  id: number;
  parentEmail: string;
  name: string;
  parentName: string;
  parentMobile: string;
};

export const students: Student[] = [
  {
    courseId: 'WS_SZO_20250220_ER_01',
    id: 104798,
    parentEmail: 'zhutianhua@hotmail.com',
    name: 'Dani',
    parentName: 'Zhu Nora',
    parentMobile: '+36300100379',
  },
  {
    courseId: 'WS_SZO_20250215_ER_02',
    id: 104791,
    parentEmail: 'keresztesi.olivia@gmail.com',
    name: 'Staudinger Mia Olívia',
    parentName: 'Keresztesi Olívia',
    parentMobile: '+36305116970',
  },
  {
    courseId: 'WS_SZO_20250215_ER_02',
    id: 104784,
    parentEmail: 'eszter.jakfalvi@gmail.com',
    name: 'Takács Vince Ágoston',
    parentName: 'Jákfalvi Eszter',
    parentMobile: '+36702791191',
  },
];
