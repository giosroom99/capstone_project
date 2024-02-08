import { api } from "./apiCall";
export default function is_Employee(personID) {
  let response = false;

  try {
    // const role = api.get(`/role/${personID}`);
    // if (role) {
    //   response = true;
    //   return response;
    // }
    return response;
  } catch (error) {
    console.error({ Error: error });
  }
}
