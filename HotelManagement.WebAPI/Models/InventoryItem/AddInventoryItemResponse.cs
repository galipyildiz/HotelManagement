namespace HotelManagement.WebAPI.Models.InventoryItem
{
    public class AddInventoryItemResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public List<AddLocationRequest> Locations { get; set; } = new();

    }
}
