using HotelManagement.Data.Enums;

namespace HotelManagement.Data.Models
{
    public class InventoryMovement : Base
    {
        public required InventoryItem InventoryItem { get; set; }
        public Storage? FromStorage { get; set; }
        public Storage? ToStorage { get; set; }
        public Room? ToRoom { get; set; }
        public MovementType MovementType { get; set; }
        public int Quantity { get; set; }
        public DateTime MovementDate { get; set; }
        public string? Notes { get; set; }
    }
}
