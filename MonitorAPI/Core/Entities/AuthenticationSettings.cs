using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class AuthenticationSettings
    {
        public string Secret { get; set; }
        public string ExpiryTokenLimitinMins { get; set; }
    }
}
