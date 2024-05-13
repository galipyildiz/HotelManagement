using HotelManagement.WebAPI.Models.InventoryItem;
using HotelManagement.WebAPI.Models.InventoryItemMovement;

namespace HotelManagement.WebAPI.Services.Abstract
{
    public interface IInventoryItemService
    {
        Task<AddInventoryItemResponse> AddInventoryItemAsync(AddInventoryItemRequest request);
        Task<List<GetInventoryMovementResponse>> GetAllInventoryMovementsAsync();
    }
}
