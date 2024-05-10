namespace HotelManagement.Data.Models
{
    public class InventoryItemLocation
    {
        public required InventoryItem InventoryItem { get; set; }
        public required Storage Storage { get; set; }
        public int Quantity { get; set; }
    }
}
