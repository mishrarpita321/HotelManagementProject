import base from "./baseurl";

export default {
  categoriesGetAllEndpoint: base.baseurl + "/admin/category",
  categoryAddEndpoint: base.baseurl + "/admin/category/add",
  categoryDeleteEndpoint: base.baseurl + "/admin/category/delete",

  storageTokenKeyName: "accessToken",
};
