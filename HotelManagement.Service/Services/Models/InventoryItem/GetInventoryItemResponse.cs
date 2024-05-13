namespace HotelManagement.Service.Services.Models.InventoryItem
{
    public class GetInventoryItemResponse
    {
        public int InventoryItemId { get; set; }
        public string InventoryItemName { get; set; } = "";
        public int StorageId { get; set; }
        public string StorgaName { get; set; } = "";
        public int Quantity { get; set; }
    }
}
