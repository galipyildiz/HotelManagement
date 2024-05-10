namespace HotelManagement.Data.Models
{
    public class Room : Base
    {
        public required string Name { get; set; }
        public required Building Building { get; set; }
    }
}
