using HotelManagement.Data.Models;
using HotelManagement.Service.Services;
using HotelManagement.Services.Models.Building;
using HotelManagement.Services.Services.Concrete;

namespace HotelManagement.Services.Services.Abstract
{
    public class BuildingService : IBuildingService
    {
        private readonly IRepository<Building> _repository;

        public BuildingService(IRepository<Building> repository)
        {
            _repository = repository;
        }

        public async Task<AddBuildingResponse> AddBuildingAsync(AddBuildingRequest request)
        {
            var building = await _repository.AddAsync(new Building() { Name = request.Name });

            return new AddBuildingResponse()
            {
                Id = building.Id,
                Name = building.Name,
            };
        }

        public async Task DeleteBuildingAsync(int id)
        {
            var building = await _repository.GetByIdAsync(id);

            if (building == null)
                throw new NullReferenceException($"{id} not found");

            await _repository.DeleteAsync(building);
        }

        public async Task<List<GetBuildingResponse>> GetAllBuildingsAsync()
        {
            var buildings = await _repository.GetAllAsync();

            var result = new List<GetBuildingResponse>();

            foreach (var building in buildings)
            {
                result.Add(new GetBuildingResponse()
                {
                    Id = building.Id,
                    Name = building.Name,
                });
            }

            return result;
        }

        public async Task<GetBuildingResponse> GetBuildingByIdAsync(int id)
        {
            var building = await _repository.GetByIdAsync(id);

            return new GetBuildingResponse()
            {
                Id = building.Id,
                Name = building.Name,
            };
        }

        public async Task<GetBuildingResponse> UpdateBuildingsAsync(int id, AddBuildingRequest request)
        {
            var building = await _repository.GetByIdAsync(id);
            if (building == null)
                throw new NullReferenceException($"{id} not found");

            building.Name = request.Name;

            await _repository.UpdateAsync(building);
            return new GetBuildingResponse()
            {
                Id = building.Id,
                Name = building.Name,
            };
        }
    }
}
