// Sales Autopilot API url
export const SAPI_URL = 'https://api.salesautopilot.com/list/136861/order/subdate/asc';

// Azok a mezők, amelyeket tárolunk a DB-ben
export const listFields = [
  'id',
  'subdate',
  'email',
  'mssys_firstname',
  'mssys_lastname',
  'mssys_bill_company',
  'mssys_bill_city',
  'mssys_bill_zip',
  'mssys_bill_address',
  'mssys_coupon',
  'mssys_vat_number',
  'mssys_billing_address_type',
  'gyermek_neve',
  'gyermek_email',
  'gyermek_osztalyfoka',
  'gyermek_taj',
  'kulonleges_etrendet_ker',
  'kulonleges_etrend',
  'mssys_mobile',
  'csomag_tipus',
  'csomag_kod',
  'betegsege_van',
  'betegseg',
  'kedvezmeny_1',
  'kedvezmeny_2',
];

// API request config - Basic auth + content-type
export const config = {
  auth: {
    username: process.env.SAPI_USER,
    password: process.env.SAPI_PASS,
  },
  header: {
    'Content-Type': 'application/json',
  },
};

export type NewStudentsDto = {
  id: number;
  subdate: string;
  email: string;
  mssys_firstname: string;
  mssys_lastname: string;
  mssys_bill_company: string;
  mssys_bill_city: string;
  mssys_bill_zip: string;
  mssys_bill_address: string;
  mssys_coupon: string;
  mssys_vat_number: string;
  mssys_billing_address_type: string;
  gyermek_neve: string;
  gyermek_email: string;
  gyermek_osztalyfoka: string;
  gyermek_taj: string;
  kulonleges_etrendet_ker: string;
  kulonleges_etrend: string;
  mssys_mobile: string;
  csomag_tipus: string;
  csomag_kod: string;
  betegsege_van: string;
  betegseg: string;
  kedvezmeny_1: string;
  kedvezmeny_2: string;
};
