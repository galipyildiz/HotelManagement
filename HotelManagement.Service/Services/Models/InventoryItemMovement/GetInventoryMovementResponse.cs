using HotelManagement.Data.Enums;

namespace HotelManagement.Services.Models.InventoryItemMovement
{
    public class GetInventoryMovementResponse
    {
        public int InventoryMovementId { get; set; }
        public int InventoryItemId { get; set; }
        public string InventoryItemName { get; set; } = "";
        public int? FromStorageId { get; set; }
        public string FromStorageName { get; set; } = "";
        public int? ToStorageId { get; set; }
        public string ToStorageName { get; set; } = "";
        public int? ToRoomId { get; set; }
        public string ToRoomName { get; set; } = "";
        public MovementType MovementType { get; set; }
        public DateTime MovementDate { get; set; }
        public int Quantity { get; set; }
    }
}
