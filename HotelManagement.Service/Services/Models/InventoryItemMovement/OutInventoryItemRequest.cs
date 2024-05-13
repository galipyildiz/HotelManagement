namespace HotelManagement.Service.Services.Models.InventoryItemMovement
{
    public class OutInventoryItemRequest
    {
        public int InventoryItemId { get; set; }
        public int FromStorageId { get; set; }
        public int ToRoomId { get; set; }
        public int Quantity { get; set; }
    }
}
