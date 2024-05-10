namespace HotelManagement.Data.Models
{
    public class Building : Base
    {
        public required string Name { get; set; }
        public List<Room> Rooms { get; set; } = new();
        public List<Storage> Storages { get; set; } = new();
    }
}
