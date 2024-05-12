namespace HotelManagement.Data.Models
{
    public class Room : Base
    {
        public required string Name { get; set; }
        public int BuildingId { get; set; }
        public Building Building { get; set; }
    }
}
