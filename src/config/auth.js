import base from "./baseurl";

export default {
  loginEndpoint: base.baseurl + "/auth/signin",
  meEndpoint: base.baseurl + "/auth/me",
  registrationEndpoint: base.baseurl + "/auth/signup",

  storageTokenKeyName: "accessToken",
};
