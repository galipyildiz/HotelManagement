﻿namespace HotelManagement.WebAPI.Models.Room
{
    public class AddRoomRequest
    {
        public int BuildingId { get; set; }
        public string Name { get; set; } = "";
    }
}
