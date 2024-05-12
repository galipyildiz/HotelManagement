using HotelManagement.WebAPI.Models.Storage;

namespace HotelManagement.WebAPI.Services.Concrete
{
    public interface IStorageService
    {
        Task<List<GetStorageResponse>> GetAllStoragesAsync();
        Task<GetStorageResponse> GetStorageByIdAsync(int id);
        Task<List<GetStorageResponse>> GetStoragesByBuildingIdAsync(int buildingId);
        Task<AddStorageResponse> AddStorageAsync(AddStorageRequest request);
        Task DeleteStorageAsync(int id);
        Task<GetStorageResponse> UpdateStorageAsync(int id, AddStorageRequest request);
    }
}
