﻿using HotelManagement.Service.Services.Models.InventoryItemMovement;
using HotelManagement.Services.Models.InventoryItem;
using HotelManagement.Services.Services.Abstract;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HotelManagement.WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class InventoryItemsController : ControllerBase
    {
        private readonly IInventoryItemService _inventoryItemService;

        public InventoryItemsController(IInventoryItemService inventoryItemService)
        {
            _inventoryItemService = inventoryItemService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoryMovements()
        {
            var response = await _inventoryItemService.GetAllInventoryMovementsAsync();
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddInventoryItem(AddInventoryItemRequest request)
        {
            var response = await _inventoryItemService.AddInventoryItemAsync(request);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> OutInventoryItem(OutInventoryItemRequest request)
        {
            await _inventoryItemService.OutInventoryItemAsync(request);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInventoryItems()
        {
            var response = await _inventoryItemService.GetAllInventoryItemsAsync();
            return Ok(response);
        }
    }
}
