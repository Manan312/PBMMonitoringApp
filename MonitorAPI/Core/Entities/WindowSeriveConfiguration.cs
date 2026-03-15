using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class WindowSeriveConfiguration
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string URL { get; set; }
        public bool ToMonitor { get; set; }
    }
}
