using HotelManagement.Services.Models.Room;

namespace HotelManagement.Services.Services.Concrete
{
    public interface IRoomService
    {
        Task<GetRoomResponse> GetRoomByIdAsync(int id);
        Task<List<GetRoomResponse>> GetRoomsByBuildingIdAsync(int buildingId);
        Task<AddRoomResponse> AddRoomAsync(AddRoomRequest request);
        Task DeleteRoomAsync(int id);
        Task<GetRoomResponse> UpdateRoomAsync(int id, AddRoomRequest request);
    }
}
