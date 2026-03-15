using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTO
{
    public class MasterSyncEntityCountDTO
    {
        public string EntityType { get; set; }
        public int SuccessCount { get; set; }
        public int FailureCount { get; set; }
        public int PendingCount { get; set; }
    }
}
