import base from "./baseurl";

export default {
  categoriesGetAllEndpoint: base.baseurl + "/category",
  categoryAddEndpoint: base.baseurl + "/admin/category/add",
  categoryEditEndpoint: base.baseurl + "/admin/category/update/id",
  categoryDeleteEndpoint: base.baseurl + "/admin/category/delete/id",

  storageTokenKeyName: "accessToken",
};
