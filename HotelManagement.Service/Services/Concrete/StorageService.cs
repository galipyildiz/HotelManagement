using HotelManagement.Data.Models;
using HotelManagement.Service.Services;
using HotelManagement.Services.Models.Storage;
using HotelManagement.Services.Services.Concrete;

namespace HotelManagement.Services.Services.Abstract
{
    public class StorageService : IStorageService
    {
        private readonly IRepository<Storage> _repository;
        public StorageService(IRepository<Storage> repository)
        {
            _repository = repository;
        }

        public async Task<AddStorageResponse> AddStorageAsync(AddStorageRequest request)
        {
            var storage = await _repository.AddAsync(new Storage()
            {
                Name = request.Name,
                BuildingId = request.BuildingId
            });

            return new AddStorageResponse
            {
                Id = storage.Id,
                Name = storage.Name
            };
        }

        public async Task DeleteStorageAsync(int id)
        {
            var storage = await _repository.GetByIdAsync(id);

            if (storage == null)
                throw new NullReferenceException($"{id} not found");

            await _repository.DeleteAsync(storage);
        }

        public async Task<List<GetStorageResponse>> GetAllStoragesAsync()
        {
            var storages = await _repository.GetAllAsync();

            var result = new List<GetStorageResponse>();

            foreach (var storage in storages)
            {
                result.Add(new GetStorageResponse
                {
                    Id = storage.Id,
                    Name = storage.Name
                });
            }

            return result;
        }

        public async Task<GetStorageResponse> GetStorageByIdAsync(int id)
        {
            var storage = await _repository.GetByIdAsync(id);
            if (storage == null)
                throw new NullReferenceException($"{id} not found");

            return new GetStorageResponse
            {
                Id = storage.Id,
                Name = storage.Name
            };
        }

        public async Task<List<GetStorageResponse>> GetStoragesByBuildingIdAsync(int buildingId)
        {
            var storages = await _repository.GetAllAsync();

            var filteredStorages = storages.Where(storage => storage.BuildingId == buildingId).ToList();

            var result = new List<GetStorageResponse>();

            foreach (var storage in filteredStorages)
            {
                result.Add(new GetStorageResponse
                {
                    Id = storage.Id,
                    Name = storage.Name
                });
            }

            return result;
        }

        public async Task<GetStorageResponse> UpdateStorageAsync(int id, AddStorageRequest request)
        {
            var storage = await _repository.GetByIdAsync(id);
            if (storage == null)
                throw new NullReferenceException($"{id} not found");

            storage.Name = request.Name;
            await _repository.UpdateAsync(storage);
            return new GetStorageResponse
            {
                Id = storage.Id,
                Name = storage.Name
            };
        }
    }
}
