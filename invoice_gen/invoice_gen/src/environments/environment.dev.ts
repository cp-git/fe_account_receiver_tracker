import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: false,
  // departmentUrl: `${commonEnv.baseUrl}/department/uhpocms`,

  // accessPrivilegeUrl: `http://localhost:8090/accessprivilege/uhpocms`,

  // countryUrl: `http://localhost:8090/country/ttsms/country`,
  // employeeUrl: `http://localhost:8090/ttsms`,
  // companyUrl: `http://localhost:8090/company/ttsms/company`,
  // reasonUrl: `http://localhost:8090/reason/ttsms`,
  // statusUrl: `http://localhost:8090/status/ttsms`,
  // taskUrl: `http://localhost:8081/ttsms`,
  // passwordUrl: `http://localhost:8090/ttsms/password`,
  //forgotUrl: `http://localhost:8090/ttsms/forgotpass`,
  // statusURL: `http://localhost:8090/status/ttsms`,
  // hiringCompanyUrl: `http://localhost:8090/ttsms/hiringcompany`,
  // benchCandidateUrl: `https://127.0.0.1:8444/ttsms/benchcandidate`,

  countryUrl: `${commonEnv.baseUrl}/country/ttsms/country`,
  employeeUrl: `${commonEnv.baseUrl}/employee/ttsms`,
  companyUrl: `${commonEnv.baseUrl}/company/ttsms/company`,
  reasonUrl: `${commonEnv.baseUrl}/reason/ttsms`,
  statusURL: `${commonEnv.baseUrl}/status/ttsms`,
  taskUrl: `${commonEnv.baseUrl}/task/ttsms`,
  passwordUrl: `${commonEnv.baseUrl}/employee/ttsms/password`,
  forgotUrl: `${commonEnv.baseUrl}/employee/ttsms/forgotpass`,
  hiringCompanyUrl: `${commonEnv.baseUrl}/hiringcompany/ttsms/hiringcompany`,
  benchCandidateUrl: `${commonEnv.baseUrl}/benchcandidate/ttsms/benchcandidate`,
};
