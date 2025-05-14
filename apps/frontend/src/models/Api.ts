/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CourseDto {
  description: string;
  id: number;
  courseId: string;
  headcount?: number | null;
  maxHeadCount: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
}

export interface ActiveCourseDto {
  description: string;
  id: number;
  courseId: string;
  groupDescription: string;
  occupancy: number;
  headcount?: number | null;
  maxHeadCount: number;
  price: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
}

export interface UpdateCourseDto {
  description: string;
  courseId: string;
  headcount?: number | null;
  maxHeadCount: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
}

export interface LessonDateDto {
  id: number;
  description: string | null;
  /** @format date-time */
  date: string;
}

export interface LessonDateInfoDto {
  /** @format date-time */
  date: string;
  description: string | null;
}

export interface CreateLessonDateDto {
  courseId: number;
  dateInfo: LessonDateInfoDto[];
}

export interface UpdateLessonDateDto {
  id: number;
  /** @format date-time */
  date: string;
  description: string | null;
}

export interface AttendanceDto {
  lessonDateId: number;
  /** @format date-time */
  date: string;
  description?: string;
  attended: boolean;
}

export interface StudentDto {
  id: number;
  sapId: number;
  /** @format date-time */
  subdate: string;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
  attendance: AttendanceDto[];
}

export interface StudentAttendanceDto {
  courseId: string;
  students: StudentDto[];
}

export interface UpdateStudentDetailsDTO {
  id: number;
  sapId: number;
  email: string;
  firstname: string;
  lastname: string;
  billCompany?: string;
  city?: string;
  zip?: number;
  address?: string;
  coupon?: string;
  vatNum?: string;
  billingAddressTypeId: number;
  childName: string;
  childMail?: string;
  childGrade?: number;
  childTAJ?: string;
  specialDiet: boolean;
  specialDietDesc?: string;
  mobile?: string;
  packageType?: string;
  packageCode?: string;
  disease: boolean;
  diseaseDesc?: string;
  discount?: string;
  discount2?: string;
}

export interface StudentDetailsDTO {
  id: number;
  sapId: number;
  /** @format date-time */
  subdate: string;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
}

export interface BillingAddressTypeDto {
  id: number;
  description: string;
}

export interface LocationDto {
  id: number;
  description: string;
}

export interface GroupDto {
  id: number;
  description: string;
}

export interface ProfileDto {
  id: number;
  email: string;
  name: string;
  roleId: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface PackageDto {
  type: string;
  id: number;
  packageId: string;
  price: number;
  locationId: number;
  locationDesc: string;
  active: boolean;
  groupId: number;
  groupDesc: string;
}

export interface CreatePackageDto {
  packageId: string;
  price: number;
  type: string;
  locationId: number;
  active: boolean;
  groupId: number;
}

export interface CourseAssignDto {
  id: number;
  courseId: string;
}

export interface PackageAssignDto {
  packageId: string;
}

export interface AssingDto {
  courseId: number;
  packageId: string;
}

export interface PackageCourseAssignDto {
  courses: CourseAssignDto[];
  packages: PackageAssignDto[];
  assignments: AssingDto[];
}

export interface AssignPackageToCourseDto {
  courseId: number;
  packageId: string;
  assign: boolean;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '/';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Etalon-organization
 * @version 1.0
 * @baseUrl /
 * @contact
 *
 * API documentation for Etalon organization
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params,
    });

  courses = {
    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerGetCourses
     * @request GET:/courses/GetCourses
     */
    courseControllerGetCourses: (params: RequestParams = {}) =>
      this.request<CourseDto[], any>({
        path: `/courses/GetCourses`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerGetActiveCourses
     * @request GET:/courses/GetActiveCourses
     */
    courseControllerGetActiveCourses: (params: RequestParams = {}) =>
      this.request<ActiveCourseDto[], any>({
        path: `/courses/GetActiveCourses`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerGetCourseById
     * @request GET:/courses/GetCourseById/{id}
     */
    courseControllerGetCourseById: (id: number, params: RequestParams = {}) =>
      this.request<CourseDto, any>({
        path: `/courses/GetCourseById/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerUpdateCourse
     * @request PUT:/courses/UpdateCourse/{id}
     */
    courseControllerUpdateCourse: (id: number, data: UpdateCourseDto, params: RequestParams = {}) =>
      this.request<CourseDto, any>({
        path: `/courses/UpdateCourse/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerCreateCourses
     * @request POST:/courses/CreateCourses
     */
    courseControllerCreateCourses: (data: UpdateCourseDto[], params: RequestParams = {}) =>
      this.request<CourseDto[], any>({
        path: `/courses/CreateCourses`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerGetCourseDates
     * @request GET:/courses/CourseDatesByCourseId/{id}
     */
    courseControllerGetCourseDates: (id: number, params: RequestParams = {}) =>
      this.request<LessonDateDto[], any>({
        path: `/courses/CourseDatesByCourseId/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerCreateLessonDates
     * @request POST:/courses/CreateLessonDates
     */
    courseControllerCreateLessonDates: (data: CreateLessonDateDto, params: RequestParams = {}) =>
      this.request<LessonDateDto[], any>({
        path: `/courses/CreateLessonDates`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Courses
     * @name CourseControllerUpdateLessonDate
     * @request PUT:/courses/UpdateLessonDate
     */
    courseControllerUpdateLessonDate: (data: UpdateLessonDateDto, params: RequestParams = {}) =>
      this.request<LessonDateDto, any>({
        path: `/courses/UpdateLessonDate`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  students = {
    /**
     * No description
     *
     * @tags Students
     * @name StudentControllerGetAllStudents
     * @request GET:/students/students
     */
    studentControllerGetAllStudents: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/students/students`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Students
     * @name StudentControllerGetStudentsByCourseWithAttendances
     * @request GET:/students/GetStudentsByCourseWithAttendances/{id}
     */
    studentControllerGetStudentsByCourseWithAttendances: (id: number, params: RequestParams = {}) =>
      this.request<StudentAttendanceDto, any>({
        path: `/students/GetStudentsByCourseWithAttendances/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Students
     * @name StudentControllerUpdateAttendance
     * @request PUT:/students/UpdateAttendances
     */
    studentControllerUpdateAttendance: (data: string[], params: RequestParams = {}) =>
      this.request<object[], any>({
        path: `/students/UpdateAttendances`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Students
     * @name StudentControllerUpdateStudentDetails
     * @request PUT:/students/UpdateStudentDetails
     */
    studentControllerUpdateStudentDetails: (data: UpdateStudentDetailsDTO, params: RequestParams = {}) =>
      this.request<StudentDetailsDTO, any>({
        path: `/students/UpdateStudentDetails`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  billingAddressType = {
    /**
     * No description
     *
     * @tags BillingAddressTypes
     * @name BillingAddressTypeControllerGetBillingAddressTypes
     * @request GET:/billingAddressType/GetBillingAddressTypes
     */
    billingAddressTypeControllerGetBillingAddressTypes: (params: RequestParams = {}) =>
      this.request<BillingAddressTypeDto[], any>({
        path: `/billingAddressType/GetBillingAddressTypes`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  locations = {
    /**
     * No description
     *
     * @tags Locations
     * @name LocationsControllerGetLocations
     * @request GET:/locations/GetLocations
     */
    locationsControllerGetLocations: (params: RequestParams = {}) =>
      this.request<LocationDto[], any>({
        path: `/locations/GetLocations`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  groups = {
    /**
     * No description
     *
     * @tags Groups
     * @name GroupControllerGetGroups
     * @request GET:/groups/GetGroups
     */
    groupControllerGetGroups: (params: RequestParams = {}) =>
      this.request<GroupDto[], any>({
        path: `/groups/GetGroups`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerGetUserProfile
     * @request GET:/user/{id}
     */
    userControllerGetUserProfile: (id: number, params: RequestParams = {}) =>
      this.request<ProfileDto, any>({
        path: `/user/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegisterUser
     * @request POST:/auth/register
     */
    authControllerRegisterUser: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefreshToken
     * @request POST:/auth/refresh
     */
    authControllerRefreshToken: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/refresh`,
        method: 'POST',
        ...params,
      }),
  };
  packages = {
    /**
     * No description
     *
     * @tags Package
     * @name PackageControllerGetPackages
     * @request GET:/packages/GetPackages
     */
    packageControllerGetPackages: (params: RequestParams = {}) =>
      this.request<PackageDto[], any>({
        path: `/packages/GetPackages`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Package
     * @name PackageControllerCreatePackages
     * @request POST:/packages/CreatePackages
     */
    packageControllerCreatePackages: (data: CreatePackageDto[], params: RequestParams = {}) =>
      this.request<PackageDto[], any>({
        path: `/packages/CreatePackages`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Package
     * @name PackageControllerGetPackagesAndCourses
     * @request GET:/packages/GetPackagesAndCoursesByLocGroupType
     */
    packageControllerGetPackagesAndCourses: (
      query: {
        type: string;
        groupId: number;
        locationId: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<PackageCourseAssignDto, any>({
        path: `/packages/GetPackagesAndCoursesByLocGroupType`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Package
     * @name PackageControllerAssignCoursesToPackages
     * @request POST:/packages/assign
     */
    packageControllerAssignCoursesToPackages: (data: AssignPackageToCourseDto[], params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/packages/assign`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
