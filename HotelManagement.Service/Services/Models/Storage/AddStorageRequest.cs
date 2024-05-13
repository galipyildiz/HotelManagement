namespace HotelManagement.Services.Models.Storage
{
    public class AddStorageRequest
    {
        public int BuildingId { get; set; }
        public string Name { get; set; } = "";
    }
}
