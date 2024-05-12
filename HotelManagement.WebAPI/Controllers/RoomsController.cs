using HotelManagement.WebAPI.Models.Room;
using HotelManagement.WebAPI.Services.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomById(int id)
        {
            var response = await _roomService.GetRoomByIdAsync(id);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomsByBuildingId(int buildingId)
        {
            var response = await _roomService.GetRoomsByBuildingIdAsync(buildingId);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom(AddRoomRequest request)
        {
            var response = await _roomService.AddRoomAsync(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            await _roomService.DeleteRoomAsync(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateRoomAsync(int id, AddRoomRequest request)
        {
            var response = await _roomService.UpdateRoomAsync(id, request);
            return Ok(response);
        }
    }
}
