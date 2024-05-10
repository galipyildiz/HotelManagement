namespace HotelManagement.Data.Models
{
    public class Storage : Base
    {
        public required string Name { get; set; }
        public required Building Building { get; set; }
        public List<InventoryItem> InventoryItems { get; set; }
        public List<InventoryItemLocation> InventoryItemLocations { get; set; } = new();
    }
}
