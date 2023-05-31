import base from "./baseurl";

export default {
  loginEndpoint: base.baseurl + "/auth/signin",
  meEndpoint: base.baseurl + "/me",

  storageTokenKeyName: "accessToken",
};
