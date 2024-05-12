namespace HotelManagement.Data.Models
{
    public class Storage : Base
    {
        public required string Name { get; set; }
        public int BuildingId { get; set; }
        public Building Building { get; set; }
        public List<InventoryItem> InventoryItems { get; set; } = new();
        public List<InventoryItemLocation> InventoryItemLocations { get; set; } = new();
    }
}
