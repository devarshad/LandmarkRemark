using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models.ViewModel
{
    public class UserLocationModel
    {
        public String UserName { get; set; }

        public GeoLocationRemark Position { get; set; }
    }
}