using HotelManagement.Data.Models;
using HotelManagement.Service.Services.Interfaces;
using HotelManagement.WebAPI.Models.InventoryItem;
using HotelManagement.WebAPI.Services.Abstract;

namespace HotelManagement.WebAPI.Services.Concrete
{
    public class InventoryItemService : IInventoryItemService
    {
        private readonly IRepository<InventoryItem> _inventoryItemRepository;
        private readonly IRepository<Storage> _storageRepository;
        private readonly IRepository<InventoryMovement> _inventoryMovementRepository;

        public InventoryItemService(
            IRepository<InventoryItem> inventoryItemRepository,
            IRepository<Storage> storageRepository,
            IRepository<InventoryMovement> inventoryMovementRepository)
        {
            _inventoryItemRepository = inventoryItemRepository;
            _storageRepository = storageRepository;
            _inventoryMovementRepository = inventoryMovementRepository;
        }
        public async Task<AddInventoryItemResponse> AddInventoryItemAsync(AddInventoryItemRequest request)
        {
            if (request.Locations.Count == 0)
                throw new ArgumentException("Locations not defined");

            var inventoryItem = await _inventoryItemRepository.AddAsync(new InventoryItem()
            {
                Name = request.Name,
            });

            if (inventoryItem == null)
                throw new NullReferenceException("add op not completed");

            var storages = new List<Storage>();
            var inventoryItemLocations = new List<InventoryItemLocation>();

            foreach (var addLocationRequest in request.Locations)
            {
                var storage = await _storageRepository.GetByIdAsync(addLocationRequest.StorageId);
                storages.Add(storage);
                inventoryItemLocations.Add(new InventoryItemLocation()
                {
                    InventoryItem = inventoryItem,
                    Storage = storage,
                    Quantity = addLocationRequest.Quantity
                });
            }

            inventoryItem.InventoryItemLocations = inventoryItemLocations;
            inventoryItem.Storages = storages;
            await _inventoryItemRepository.UpdateAsync(inventoryItem);

            foreach (var inventoryItemLocation in inventoryItem.InventoryItemLocations)
            {
                await _inventoryMovementRepository.AddAsync(new InventoryMovement()
                {
                    InventoryItem = inventoryItem,
                    MovementDate = DateTime.UtcNow,
                    MovementType = Data.Enums.MovementType.In,
                    Quantity = inventoryItemLocation.Quantity,
                    ToStorage = inventoryItemLocation.Storage,
                });
            }

            var locations = new List<AddLocationRequest>();
            foreach (var location in inventoryItem.InventoryItemLocations)
            {
                locations.Add(new AddLocationRequest()
                {
                    Quantity = location.Quantity,
                    StorageId = location.Storage.Id
                });
            }
            return new AddInventoryItemResponse
            {
                Id = inventoryItem.Id,
                Name = inventoryItem.Name,
                Locations = locations
            };
        }
    }
}
