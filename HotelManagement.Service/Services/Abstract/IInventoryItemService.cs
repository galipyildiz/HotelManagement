using HotelManagement.Service.Services.Models.InventoryItem;
using HotelManagement.Service.Services.Models.InventoryItemMovement;
using HotelManagement.Services.Models.InventoryItem;
using HotelManagement.Services.Models.InventoryItemMovement;

namespace HotelManagement.Services.Services.Abstract
{
    public interface IInventoryItemService
    {
        Task<AddInventoryItemResponse> AddInventoryItemAsync(AddInventoryItemRequest request);
        Task<List<GetInventoryMovementResponse>> GetAllInventoryMovementsAsync();
        Task OutInventoryItemAsync(OutInventoryItemRequest request);
        Task<List<GetInventoryItemResponse>> GetAllInventoryItemsAsync();
    }
}
