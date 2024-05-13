using HotelManagement.Data.Models;
using HotelManagement.Service.Services;
using HotelManagement.Services.Models.Room;
using HotelManagement.Services.Services.Concrete;

namespace HotelManagement.Services.Services.Abstract
{
    public class RoomService : IRoomService
    {
        private readonly IRepository<Room> _repository;
        //TODO validate fluent validation
        public RoomService(IRepository<Room> repository)
        {
            _repository = repository;
        }
        public async Task<AddRoomResponse> AddRoomAsync(AddRoomRequest request)
        {
            var room = await _repository.AddAsync(new Room()
            {
                Name = request.Name,
                BuildingId = request.BuildingId,
            });

            return new AddRoomResponse
            {
                Id = room.Id,
                Name = room.Name
            };
        }

        public async Task DeleteRoomAsync(int id)
        {
            var room = await _repository.GetByIdAsync(id);

            if (room == null)
                throw new NullReferenceException($"{id} not found");

            await _repository.DeleteAsync(room);
        }

        public async Task<GetRoomResponse> GetRoomByIdAsync(int id)
        {
            var room = await _repository.GetByIdAsync(id);

            if (room == null)
                throw new NullReferenceException($"{id} not found");

            return new GetRoomResponse
            {
                Id = room.Id,
                Name = room.Name
            };
        }

        public async Task<List<GetRoomResponse>> GetRoomsByBuildingIdAsync(int buildingId)
        {
            var rooms = await _repository.GetAllAsync();

            var filteredRooms = rooms.Where(room => room.BuildingId == buildingId).ToList();

            var result = new List<GetRoomResponse>();

            foreach (var room in filteredRooms)
            {
                result.Add(new GetRoomResponse { Id = room.Id, Name = room.Name });
            }

            return result;
        }

        public async Task<GetRoomResponse> UpdateRoomAsync(int id, AddRoomRequest request)
        {
            var room = await _repository.GetByIdAsync(id);

            if (room == null)
                throw new NullReferenceException($"{id} not found");

            room.Name = request.Name;
            await _repository.UpdateAsync(room);
            return new GetRoomResponse { Id = room.Id, Name = room.Name };
        }
    }
}
