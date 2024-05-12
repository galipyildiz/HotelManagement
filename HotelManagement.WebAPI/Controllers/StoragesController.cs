using HotelManagement.WebAPI.Models.Storage;
using HotelManagement.WebAPI.Services.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class StoragesController : ControllerBase
    {
        private readonly IStorageService _storageService;

        public StoragesController(IStorageService storageService)
        {
            _storageService = storageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStorageById(int id)
        {
            var response = await _storageService.GetStorageByIdAsync(id);
            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetStoragesByBuildingId(int buildingId)
        {
            var response = await _storageService.GetStoragesByBuildingIdAsync(buildingId);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddStorage(AddStorageRequest request)
        {
            var response = await _storageService.AddStorageAsync(request);
            return Ok(response);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteStorage(int id)
        {
            await _storageService.DeleteStorageAsync(id);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateStorage(int id, AddStorageRequest request)
        {
            var response = await _storageService.UpdateStorageAsync(id, request);
            return Ok(response);
        }
    }
}
