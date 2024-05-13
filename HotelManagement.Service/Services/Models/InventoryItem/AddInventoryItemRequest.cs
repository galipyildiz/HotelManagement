namespace HotelManagement.Services.Models.InventoryItem
{
    public class AddInventoryItemRequest
    {
        public string Name { get; set; } = "";
        public List<AddLocationRequest> Locations { get; set; } = new();
    }

    public class AddLocationRequest
    {
        public int StorageId { get; set; }
        public int Quantity { get; set; }
    }
}
