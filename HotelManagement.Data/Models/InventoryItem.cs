﻿namespace HotelManagement.Data.Models
{
    public class InventoryItem : Base
    {
        public required string Name { get; set; }
        public List<InventoryItemLocation> InventoryItemLocations { get; set; } = new();
    }
}
