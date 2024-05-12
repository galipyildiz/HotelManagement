//Buildings
export const getAllBuildingsEndPoint = "/Buildings/GetAllBuildings";
export const getGetBuildingByIdEndPoint = "/Buildings/GetBuildingById"; //query parameter?id=1;
export const addBuildingEndPoint = "/Buildings/AddBuilding";
export const deleteBuildingEndPoint = "/Buildings/DeleteBuilding"; //query parameter?id=1
export const updateBuildingEndPoint = "/Buildings/UpdateBuilding"; //query parameter?id=1;

//Rooms
export const getRoomsByBuildingIdEndPoint = "/Rooms/GetRoomsByBuildingId"; //query parameter?buildingId=1;
export const addRoomEndPoint = "/Rooms/AddRoom";
export const deleteRoomEndPoint = "/Rooms/DeleteRoom";
export const updateRoomEndPoint = "/Rooms/UpdateRoom"; //query parameter?id=1;

//Storages
export const getStoragesByBuildingIdEndPoint =
  "/Storages/GetStoragesByBuildingId"; //query parameter?buildingId=1;
export const addStorageEndPoint = "/Storages/AddStorage";
export const deleteStorageEndPoint = "/Storages/DeleteStorage";
export const updateStorageEndPoint = "/Storages/UpdateStorage"; //query parameter?id=1;
