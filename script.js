import {check, group} from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios : {
      shared_iter_scenarios: {
          executor: 'shared-iterations',
          vus: 500,
          iterations: 500,
          starttime: '0s',
      },
      per_vu_scenarios: {
          executor: 'per-vu-iterations',
          vus: 500,
          iterations: 6,
          starttime: '2s',
      },
  },
};


export default function(){
  group('Create User Test', () => {
    const res1 = http.post('https://reqres.in/api/users');
    const payload1 = JSON.stringify({
      "name": "morpheus",
      "job": "leader"
    });
      check(res1, {
        'is status 201': (r) => r.status == 201,
      });
  })
    
  group('Update Test', () => {
    const res2 = http.put('https://reqres.in/api/users/2');
    const payload2 = JSON.stringify({
      "name": "morpheus",
      "job": "zion resident"
  });
    check(res2, {
      'is status 200': (r) => r.status == 200,
    });
  })
  
  }

  export function handleSummary(data) {
    return {
      "summary.html": htmlReport(data),
    };
  }
  


