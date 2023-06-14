import base from "./baseurl";

export default {

  userGetEstimatedCostEndpoint: base.baseurl + "/room/estimated/price",
  userGetBookingsEndpoint: base.baseurl + "/user/bookings",
  userAvailableRoomsEndPoint:base.baseurl+"/rooms/available",

  storageTokenKeyName: "accessToken",
};
