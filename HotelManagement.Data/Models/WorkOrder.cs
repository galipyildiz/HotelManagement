using HotelManagement.Data.Enums;

namespace HotelManagement.Data.Models
{
    public class WorkOrder : Base
    {
        public Building? Building { get; set; }
        public Room? Room { get; set; }
        public Storage? Storage { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public WorkOrderType WorkOrderType { get; set; }
        public WorkOrderStatus Status { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? CompletedDate { get; set; }
    }
}
