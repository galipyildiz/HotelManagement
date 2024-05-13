using HotelManagement.Data.Models;
using HotelManagement.Service.Data;
using HotelManagement.Service.Services;
using HotelManagement.Service.Services.Models.InventoryItem;
using HotelManagement.Service.Services.Models.InventoryItemMovement;
using HotelManagement.Services.Models.InventoryItem;
using HotelManagement.Services.Models.InventoryItemMovement;
using HotelManagement.Services.Services.Abstract;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Services.Services.Concrete
{
    public class InventoryItemService : IInventoryItemService
    {
        private readonly IRepository<InventoryItem> _inventoryItemRepository;
        private readonly IRepository<Storage> _storageRepository;
        private readonly IRepository<InventoryMovement> _inventoryMovementRepository;
        private readonly IRepository<Room> _roomRepository;
        private readonly HotelManagementDbContext _hotelManagementDbContext;

        public InventoryItemService(
            IRepository<InventoryItem> inventoryItemRepository,
            IRepository<Storage> storageRepository,
            IRepository<InventoryMovement> inventoryMovementRepository,
            IRepository<Room> roomRepository,
            HotelManagementDbContext hotelManagementDbContext)
        {
            _inventoryItemRepository = inventoryItemRepository;
            _storageRepository = storageRepository;
            _inventoryMovementRepository = inventoryMovementRepository;
            _roomRepository = roomRepository;
            _hotelManagementDbContext = hotelManagementDbContext;
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

        public async Task<List<GetInventoryItemResponse>> GetAllInventoryItemsAsync()
        {
            var inventoryItemLocations = await _hotelManagementDbContext.InventoryItemLocations
                .Include(x => x.InventoryItem)
                .Include(x => x.Storage)
                .ToListAsync();

            var result = new List<GetInventoryItemResponse>();

            foreach (var location in inventoryItemLocations)
            {
                result.Add(new GetInventoryItemResponse()
                {
                    InventoryItemId = location.InventoryItem.Id,
                    InventoryItemName = location.InventoryItem.Name,
                    Quantity = location.Quantity,
                    StorageId = location.Storage.Id,
                    StorgaName = location.Storage.Name
                });
            }

            return result;
        }

        public async Task<List<GetInventoryMovementResponse>> GetAllInventoryMovementsAsync()
        {
            var result = new List<GetInventoryMovementResponse>();

            var inventoryMovements = await _hotelManagementDbContext.InventoryMovements
                .Include(im => im.InventoryItem)
                .Include(im => im.ToStorage)
                .Include(im => im.FromStorage)
                .Include(im => im.ToRoom)
                    .ThenInclude(room => room.Building)
                .ToListAsync();

            foreach (var inventoryMovement in inventoryMovements)
            {
                result.Add(new GetInventoryMovementResponse
                {
                    InventoryMovementId = inventoryMovement.Id,
                    FromStorageId = inventoryMovement.FromStorage?.Id ?? 0,
                    FromStorageName = inventoryMovement.FromStorage?.Name ?? "",
                    ToRoomId = inventoryMovement.ToRoom?.Id ?? 0,
                    ToRoomName = inventoryMovement.ToRoom == null ? "" : $"{inventoryMovement.ToRoom.Building.Name}-{inventoryMovement.ToRoom.Name}",
                    ToStorageId = inventoryMovement.ToStorage?.Id ?? 0,
                    ToStorageName = inventoryMovement.ToStorage?.Name ?? "",
                    MovementType = inventoryMovement.MovementType,
                    MovementDate = inventoryMovement.MovementDate,
                    Quantity = inventoryMovement.Quantity,
                    InventoryItemId = inventoryMovement.InventoryItem.Id,
                    InventoryItemName = inventoryMovement.InventoryItem.Name,
                });
            }

            return result;
        }

        public async Task OutInventoryItemAsync(OutInventoryItemRequest request)
        {
            var inventoryItem = await _inventoryItemRepository.GetByIdAsync(request.InventoryItemId);
            var room = await _roomRepository.GetByIdAsync(request.ToRoomId);
            var storage = await _storageRepository.GetByIdAsync(request.FromStorageId);

            var inventoryItemLocation = _hotelManagementDbContext.InventoryItemLocations
                .FirstOrDefault(x => x.InventoryItem == inventoryItem && x.Storage == storage);
            if (inventoryItemLocation == null)
                throw new NullReferenceException();

            await _inventoryMovementRepository.AddAsync(new InventoryMovement()
            {
                InventoryItem = inventoryItem,
                MovementDate = DateTime.UtcNow,
                MovementType = Data.Enums.MovementType.Out,
                Quantity = request.Quantity,
                FromStorage = storage,
                ToRoom = room,
            });

            var existQuantity = inventoryItemLocation.Quantity;
            var newQuantity = existQuantity - request.Quantity;

            inventoryItemLocation.Quantity = newQuantity;
            _hotelManagementDbContext.Update(inventoryItemLocation);
            await _hotelManagementDbContext.SaveChangesAsync();
        }
    }
}
