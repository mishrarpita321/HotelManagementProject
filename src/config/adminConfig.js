import base from "./baseurl";

export default {
  categoriesGetAllEndpoint: base.baseurl + "/category",
  categoryAddEndpoint: base.baseurl + "/admin/category/add",
  categoryEditEndpoint: base.baseurl + "/admin/category/update/id",
  categoryDeleteEndpoint: base.baseurl + "/admin/category/delete/id",



  adminRoomsGetAllEndpoint: base.baseurl + "/rooms",
  adminAddRoomEndpoint: base.baseurl + "/admin/room/add/category/id",
  adminEditRoomEndpoint: base.baseurl + "/admin/room/update/id",
  adminDeleteRoomEndpoint: base.baseurl + "/admin/room/delete/id",



  adminParkingGetAllEndpoint: base.baseurl + "/parking",
  adminAddParkingEndpoint: base.baseurl + "/admin/parking/add",
  adminEditParkingEndpoint: base.baseurl + "/admin/parking/update/id",
  adminDeleteParkingEndpoint: base.baseurl + "/admin/parking/delete/id",





  storageTokenKeyName: "accessToken",
};
