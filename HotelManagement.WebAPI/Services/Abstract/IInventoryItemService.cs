using HotelManagement.WebAPI.Models.InventoryItem;

namespace HotelManagement.WebAPI.Services.Abstract
{
    public interface IInventoryItemService
    {
        Task<AddInventoryItemResponse> AddInventoryItemAsync(AddInventoryItemRequest request);
    }
}
