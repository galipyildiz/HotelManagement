using System.Text.Json.Serialization;

namespace HotelManagement.Data.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MovementType : byte
    {
        In = 1,
        Out = 2
    }
}
