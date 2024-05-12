using HotelManagement.WebAPI.Models.Building;
using HotelManagement.WebAPI.Services.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class BuildingsController : ControllerBase
    {
        private readonly IBuildingService _buildingService;

        public BuildingsController(IBuildingService buildingService)
        {
            _buildingService = buildingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBuildings()
        {
            var response = await _buildingService.GetAllBuildingsAsync();
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetBuildingById(int id)
        {
            var response = await _buildingService.GetBuildingByIdAsync(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddBuilding(AddBuildingRequest request)
        {
            var response = await _buildingService.AddBuildingAsync(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBuilding(int id)
        {
            await _buildingService.DeleteBuildingAsync(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateBuildingAsync(int id, AddBuildingRequest request)
        {
            var response = await _buildingService.UpdateBuildingsAsync(id, request);
            return Ok(response);
        }
    }
}
