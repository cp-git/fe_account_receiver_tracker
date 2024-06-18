import { commonEnv } from './environment.common';

export const environment = {
  ...commonEnv,
  production: true,
 
  countryUrl: `${commonEnv.baseUrl}/country/ttsms/country`,
  employeeUrl: `${commonEnv.baseUrl}/employee/ttsms`,
  companyUrl: `${commonEnv.baseUrl}/company/ttsms/company`,
  reasonUrl: `${commonEnv.baseUrl}/reason/ttsms`,
  statusURL: `${commonEnv.baseUrl}/status/ttsms`,
  taskUrl: `${commonEnv.baseUrl}/task/ttsms`,
  passwordUrl: `${commonEnv.baseUrl}/employee/ttsms/password`,
  forgotUrl: `${commonEnv.baseUrl}/employee/ttsms/forgotpass`,
};
