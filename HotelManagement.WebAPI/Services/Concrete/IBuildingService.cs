using HotelManagement.WebAPI.Models.Building;

namespace HotelManagement.WebAPI.Services.Concrete
{
    public interface IBuildingService
    {
        Task<GetBuildingResponse> GetBuildingByIdAsync(int id);
        Task<List<GetBuildingResponse>> GetAllBuildingsAsync();
        Task<AddBuildingResponse> AddBuildingAsync(AddBuildingRequest request);
        Task DeleteBuildingAsync(int id);
        Task<GetBuildingResponse> UpdateBuildingsAsync(int id, AddBuildingRequest request);
    }
}
