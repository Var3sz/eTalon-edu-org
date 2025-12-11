--
-- PostgreSQL database dump
--

-- \restrict 7cBfddWJhqC111ysA30SYSm6tys468Rt4okHnsmWyHrlXnKWgGXsH4eDC6v789g

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

-- Started on 2025-12-05 16:52:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 34429)
-- Name: Course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    "courseId" character varying NOT NULL,
    description character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "endTime" character varying NOT NULL,
    "groupId" integer NOT NULL,
    headcount integer,
    "locationId" integer NOT NULL,
    "startDate" timestamp(6) without time zone NOT NULL,
    "startTime" character varying NOT NULL,
    locked boolean DEFAULT false NOT NULL,
    "maxHeadCount" integer NOT NULL
);


ALTER TABLE public."Course" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 34503)
-- Name: Group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Group" (
    id integer NOT NULL,
    description character varying NOT NULL,
    "isDeleted" "char"
);


ALTER TABLE public."Group" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 34512)
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id integer NOT NULL,
    description character varying NOT NULL,
    "isDeleted" "char"
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 34590)
-- Name: Attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attendance" (
    id integer NOT NULL,
    "studentId" integer,
    attended boolean DEFAULT false,
    "lessondateId" integer
);


ALTER TABLE public."Attendance" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 34589)
-- Name: Attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Attendance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Attendance_id_seq" OWNER TO postgres;

--
-- TOC entry 5045 (class 0 OID 0)
-- Dependencies: 226
-- Name: Attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Attendance_id_seq" OWNED BY public."Attendance".id;


--
-- TOC entry 233 (class 1259 OID 35684)
-- Name: BillingAddressType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BillingAddressType" (
    id integer NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public."BillingAddressType" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 35683)
-- Name: BillingAddressType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BillingAddressType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BillingAddressType_id_seq" OWNER TO postgres;

--
-- TOC entry 5046 (class 0 OID 0)
-- Dependencies: 232
-- Name: BillingAddressType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BillingAddressType_id_seq" OWNED BY public."BillingAddressType".id;


--
-- TOC entry 247 (class 1259 OID 35743)
-- Name: CourseInvoiceDates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CourseInvoiceDates" (
    id integer NOT NULL,
    "courseId" integer,
    "invoiceDateid" integer
);


ALTER TABLE public."CourseInvoiceDates" OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 35742)
-- Name: CourseInvoiceDates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CourseInvoiceDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CourseInvoiceDates_id_seq" OWNER TO postgres;

--
-- TOC entry 5047 (class 0 OID 0)
-- Dependencies: 246
-- Name: CourseInvoiceDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CourseInvoiceDates_id_seq" OWNED BY public."CourseInvoiceDates".id;


--
-- TOC entry 235 (class 1259 OID 35693)
-- Name: CourseLessonDates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CourseLessonDates" (
    id integer NOT NULL,
    "courseId" integer,
    "lessondateId" integer
);


ALTER TABLE public."CourseLessonDates" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 35692)
-- Name: CourseLessonDates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CourseLessonDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CourseLessonDates_id_seq" OWNER TO postgres;

--
-- TOC entry 5048 (class 0 OID 0)
-- Dependencies: 234
-- Name: CourseLessonDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CourseLessonDates_id_seq" OWNED BY public."CourseLessonDates".id;


--
-- TOC entry 237 (class 1259 OID 35700)
-- Name: Course_Package; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Course_Package" (
    id integer NOT NULL,
    "packageId" character varying NOT NULL,
    "courseId" integer NOT NULL
);


ALTER TABLE public."Course_Package" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 35699)
-- Name: Course_Package_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Course_Package_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_Package_id_seq" OWNER TO postgres;

--
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 236
-- Name: Course_Package_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Course_Package_id_seq" OWNED BY public."Course_Package".id;


--
-- TOC entry 218 (class 1259 OID 34428)
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_id_seq" OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 218
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- TOC entry 220 (class 1259 OID 34502)
-- Name: Group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Group_id_seq" OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 220
-- Name: Group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Group_id_seq" OWNED BY public."Group".id;


--
-- TOC entry 245 (class 1259 OID 35734)
-- Name: InvoiceDates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."InvoiceDates" (
    id integer NOT NULL,
    date timestamp(6) without time zone NOT NULL,
    description character varying
);


ALTER TABLE public."InvoiceDates" OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 35733)
-- Name: InvoiceDates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."InvoiceDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."InvoiceDates_id_seq" OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 244
-- Name: InvoiceDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."InvoiceDates_id_seq" OWNED BY public."InvoiceDates".id;


--
-- TOC entry 239 (class 1259 OID 35709)
-- Name: LessonDates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LessonDates" (
    id integer NOT NULL,
    date timestamp(6) without time zone NOT NULL,
    description character varying
);


ALTER TABLE public."LessonDates" OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 35708)
-- Name: LessonDates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LessonDates_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LessonDates_id_seq" OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 238
-- Name: LessonDates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LessonDates_id_seq" OWNED BY public."LessonDates".id;


--
-- TOC entry 222 (class 1259 OID 34511)
-- Name: Location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Location_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Location_id_seq" OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 222
-- Name: Location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;


--
-- TOC entry 241 (class 1259 OID 35718)
-- Name: Package; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Package" (
    id integer NOT NULL,
    "packageId" character varying NOT NULL,
    price integer NOT NULL,
    type character varying NOT NULL,
    "locationId" integer NOT NULL,
    active boolean NOT NULL,
    "groupId" integer NOT NULL
);


ALTER TABLE public."Package" OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 35717)
-- Name: Package_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Package_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Package_id_seq" OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 240
-- Name: Package_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Package_id_seq" OWNED BY public."Package".id;


--
-- TOC entry 243 (class 1259 OID 35727)
-- Name: Participant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Participant" (
    id integer NOT NULL,
    "courseId" integer NOT NULL,
    "studentId" integer NOT NULL
);


ALTER TABLE public."Participant" OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 35726)
-- Name: Participant_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Participant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Participant_id_seq" OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 242
-- Name: Participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Participant_id_seq" OWNED BY public."Participant".id;


--
-- TOC entry 249 (class 1259 OID 35750)
-- Name: Payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payment" (
    id integer NOT NULL,
    "invoiceDateId" integer NOT NULL,
    "studentId" integer NOT NULL,
    "billerId" integer,
    payed boolean,
    amount integer,
    "invoiceNumber" character varying,
    "amountToBePayed" integer
);


ALTER TABLE public."Payment" OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 35749)
-- Name: Payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Payment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Payment_id_seq" OWNER TO postgres;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 248
-- Name: Payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Payment_id_seq" OWNED BY public."Payment".id;


--
-- TOC entry 231 (class 1259 OID 34636)
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name character varying
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 34635)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 230
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 225 (class 1259 OID 34540)
-- Name: Student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Student" (
    id integer NOT NULL,
    email character varying NOT NULL,
    lastname character varying NOT NULL,
    firstname character varying NOT NULL,
    "billCompany" character varying,
    city character varying,
    zip integer,
    address character varying,
    mobile character varying,
    "billingAddressTypeId" integer,
    "childGrade" integer,
    "childMail" character varying,
    "childName" character varying NOT NULL,
    "childTAJ" character varying,
    coupon character varying,
    discount character varying,
    discount2 character varying,
    disease boolean DEFAULT false,
    "diseaseDesc" character varying,
    "packageCode" character varying NOT NULL,
    "packageType" character varying NOT NULL,
    "sapId" integer NOT NULL,
    "specialDiet" boolean DEFAULT false,
    "specialDietDesc" character varying,
    subdate timestamp(6) without time zone NOT NULL,
    "vatNum" character varying
);


ALTER TABLE public."Student" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 34539)
-- Name: Student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Student_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Student_id_seq" OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 224
-- Name: Student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Student_id_seq" OWNED BY public."Student".id;


--
-- TOC entry 229 (class 1259 OID 34627)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email character varying NOT NULL,
    name character varying NOT NULL,
    password character varying NOT NULL,
    "roleId" integer NOT NULL,
    "agentKey" character varying,
    "sessionCookie" character varying
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 34626)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 228
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 4815 (class 2604 OID 34593)
-- Name: Attendance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance" ALTER COLUMN id SET DEFAULT nextval('public."Attendance_id_seq"'::regclass);


--
-- TOC entry 4819 (class 2604 OID 35687)
-- Name: BillingAddressType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BillingAddressType" ALTER COLUMN id SET DEFAULT nextval('public."BillingAddressType_id_seq"'::regclass);


--
-- TOC entry 4807 (class 2604 OID 34432)
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- TOC entry 4826 (class 2604 OID 35746)
-- Name: CourseInvoiceDates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseInvoiceDates" ALTER COLUMN id SET DEFAULT nextval('public."CourseInvoiceDates_id_seq"'::regclass);


--
-- TOC entry 4820 (class 2604 OID 35696)
-- Name: CourseLessonDates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseLessonDates" ALTER COLUMN id SET DEFAULT nextval('public."CourseLessonDates_id_seq"'::regclass);


--
-- TOC entry 4821 (class 2604 OID 35703)
-- Name: Course_Package id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course_Package" ALTER COLUMN id SET DEFAULT nextval('public."Course_Package_id_seq"'::regclass);


--
-- TOC entry 4810 (class 2604 OID 34506)
-- Name: Group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Group" ALTER COLUMN id SET DEFAULT nextval('public."Group_id_seq"'::regclass);


--
-- TOC entry 4825 (class 2604 OID 35737)
-- Name: InvoiceDates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceDates" ALTER COLUMN id SET DEFAULT nextval('public."InvoiceDates_id_seq"'::regclass);


--
-- TOC entry 4822 (class 2604 OID 35712)
-- Name: LessonDates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LessonDates" ALTER COLUMN id SET DEFAULT nextval('public."LessonDates_id_seq"'::regclass);


--
-- TOC entry 4811 (class 2604 OID 34515)
-- Name: Location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);


--
-- TOC entry 4823 (class 2604 OID 35721)
-- Name: Package id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Package" ALTER COLUMN id SET DEFAULT nextval('public."Package_id_seq"'::regclass);


--
-- TOC entry 4824 (class 2604 OID 35730)
-- Name: Participant id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant" ALTER COLUMN id SET DEFAULT nextval('public."Participant_id_seq"'::regclass);


--
-- TOC entry 4827 (class 2604 OID 35753)
-- Name: Payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment" ALTER COLUMN id SET DEFAULT nextval('public."Payment_id_seq"'::regclass);


--
-- TOC entry 4818 (class 2604 OID 34639)
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 4812 (class 2604 OID 34543)
-- Name: Student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student" ALTER COLUMN id SET DEFAULT nextval('public."Student_id_seq"'::regclass);


--
-- TOC entry 4817 (class 2604 OID 34630)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 4841 (class 2606 OID 34595)
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- TOC entry 4851 (class 2606 OID 35691)
-- Name: BillingAddressType BillingAddressType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BillingAddressType"
    ADD CONSTRAINT "BillingAddressType_pkey" PRIMARY KEY (id);


--
-- TOC entry 4870 (class 2606 OID 35748)
-- Name: CourseInvoiceDates CourseInvoiceDates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseInvoiceDates"
    ADD CONSTRAINT "CourseInvoiceDates_pkey" PRIMARY KEY (id);


--
-- TOC entry 4853 (class 2606 OID 35698)
-- Name: CourseLessonDates CourseLessonDates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseLessonDates"
    ADD CONSTRAINT "CourseLessonDates_pkey" PRIMARY KEY (id);


--
-- TOC entry 4855 (class 2606 OID 35707)
-- Name: Course_Package Course_Package_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course_Package"
    ADD CONSTRAINT "Course_Package_pkey" PRIMARY KEY (id);


--
-- TOC entry 4830 (class 2606 OID 34436)
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- TOC entry 4833 (class 2606 OID 34510)
-- Name: Group Group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Group"
    ADD CONSTRAINT "Group_pkey" PRIMARY KEY (id);


--
-- TOC entry 4868 (class 2606 OID 35741)
-- Name: InvoiceDates InvoiceDates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."InvoiceDates"
    ADD CONSTRAINT "InvoiceDates_pkey" PRIMARY KEY (id);


--
-- TOC entry 4861 (class 2606 OID 35716)
-- Name: LessonDates LessonDates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LessonDates"
    ADD CONSTRAINT "LessonDates_pkey" PRIMARY KEY (id);


--
-- TOC entry 4836 (class 2606 OID 34519)
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- TOC entry 4864 (class 2606 OID 35725)
-- Name: Package Package_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Package"
    ADD CONSTRAINT "Package_pkey" PRIMARY KEY (id);


--
-- TOC entry 4866 (class 2606 OID 35732)
-- Name: Participant Participant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_pkey" PRIMARY KEY (id);


--
-- TOC entry 4872 (class 2606 OID 35757)
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 34643)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 4838 (class 2606 OID 34547)
-- Name: Student Student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_pkey" PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 34634)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 42327)
-- Name: Attendance attendance_student_lesson_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT attendance_student_lesson_unique UNIQUE ("studentId", "lessondateId");


--
-- TOC entry 4857 (class 2606 OID 42322)
-- Name: Course_Package course_package_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course_Package"
    ADD CONSTRAINT course_package_unique UNIQUE ("packageId", "courseId");


--
-- TOC entry 4874 (class 2606 OID 42329)
-- Name: Payment studentId_invoiceDateId_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "studentId_invoiceDateId_unique" UNIQUE ("studentId", "invoiceDateId");


--
-- TOC entry 4828 (class 1259 OID 35759)
-- Name: Course_courseId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Course_courseId_key" ON public."Course" USING btree ("courseId");


--
-- TOC entry 4831 (class 1259 OID 35760)
-- Name: Group_description_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Group_description_key" ON public."Group" USING btree (description);


--
-- TOC entry 4834 (class 1259 OID 35761)
-- Name: Location_description_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Location_description_key" ON public."Location" USING btree (description);


--
-- TOC entry 4862 (class 1259 OID 35758)
-- Name: Package_packageId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Package_packageId_key" ON public."Package" USING btree ("packageId");


--
-- TOC entry 4847 (class 1259 OID 35679)
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- TOC entry 4839 (class 1259 OID 35762)
-- Name: Student_sapId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Student_sapId_key" ON public."Student" USING btree ("sapId");


--
-- TOC entry 4844 (class 1259 OID 35682)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4858 (class 1259 OID 42324)
-- Name: idx_course_package_course_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_package_course_id ON public."Course_Package" USING btree ("courseId");


--
-- TOC entry 4859 (class 1259 OID 42325)
-- Name: idx_course_package_package_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_course_package_package_id ON public."Course_Package" USING btree ("packageId");


--
-- TOC entry 4878 (class 2606 OID 35778)
-- Name: Attendance Attendance_lessondateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_lessondateId_fkey" FOREIGN KEY ("lessondateId") REFERENCES public."LessonDates"(id);


--
-- TOC entry 4879 (class 2606 OID 35783)
-- Name: Attendance Attendance_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id);


--
-- TOC entry 4889 (class 2606 OID 35833)
-- Name: CourseInvoiceDates CourseInvoiceDates_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseInvoiceDates"
    ADD CONSTRAINT "CourseInvoiceDates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id);


--
-- TOC entry 4890 (class 2606 OID 35838)
-- Name: CourseInvoiceDates CourseInvoiceDates_invoiceDateid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseInvoiceDates"
    ADD CONSTRAINT "CourseInvoiceDates_invoiceDateid_fkey" FOREIGN KEY ("invoiceDateid") REFERENCES public."InvoiceDates"(id);


--
-- TOC entry 4881 (class 2606 OID 35793)
-- Name: CourseLessonDates CourseLessonDates_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseLessonDates"
    ADD CONSTRAINT "CourseLessonDates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id);


--
-- TOC entry 4882 (class 2606 OID 35798)
-- Name: CourseLessonDates CourseLessonDates_lessondateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CourseLessonDates"
    ADD CONSTRAINT "CourseLessonDates_lessondateId_fkey" FOREIGN KEY ("lessondateId") REFERENCES public."LessonDates"(id);


--
-- TOC entry 4883 (class 2606 OID 35803)
-- Name: Course_Package Course_Package_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course_Package"
    ADD CONSTRAINT "Course_Package_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id);


--
-- TOC entry 4884 (class 2606 OID 35808)
-- Name: Course_Package Course_Package_packageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course_Package"
    ADD CONSTRAINT "Course_Package_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES public."Package"("packageId");


--
-- TOC entry 4875 (class 2606 OID 35763)
-- Name: Course Course_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id);


--
-- TOC entry 4876 (class 2606 OID 35768)
-- Name: Course Course_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id);


--
-- TOC entry 4885 (class 2606 OID 35813)
-- Name: Package Package_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Package"
    ADD CONSTRAINT "Package_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public."Group"(id);


--
-- TOC entry 4886 (class 2606 OID 35818)
-- Name: Package Package_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Package"
    ADD CONSTRAINT "Package_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id);


--
-- TOC entry 4887 (class 2606 OID 35823)
-- Name: Participant Participant_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public."Course"(id);


--
-- TOC entry 4888 (class 2606 OID 35828)
-- Name: Participant Participant_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Participant"
    ADD CONSTRAINT "Participant_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id);


--
-- TOC entry 4891 (class 2606 OID 35853)
-- Name: Payment Payment_billerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_billerId_fkey" FOREIGN KEY ("billerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4892 (class 2606 OID 35843)
-- Name: Payment Payment_invoiceDateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_invoiceDateId_fkey" FOREIGN KEY ("invoiceDateId") REFERENCES public."InvoiceDates"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4893 (class 2606 OID 35848)
-- Name: Payment Payment_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."Student"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4877 (class 2606 OID 35773)
-- Name: Student Student_billingAddressTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Student"
    ADD CONSTRAINT "Student_billingAddressTypeId_fkey" FOREIGN KEY ("billingAddressTypeId") REFERENCES public."BillingAddressType"(id);


--
-- TOC entry 4880 (class 2606 OID 35788)
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id);


-- Completed on 2025-12-05 16:52:06

--
-- PostgreSQL database dump complete
--

-- \unrestrict 7cBfddWJhqC111ysA30SYSm6tys468Rt4okHnsmWyHrlXnKWgGXsH4eDC6v789g

