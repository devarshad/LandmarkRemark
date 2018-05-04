using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication1.Models.Domain;
using WebApplication1.Models.ViewModel;

namespace WebApplication1.Controllers
{
    public class LocationController : ApiController
    {
        private LocationBO _location = null;

        public LocationController()
        {
            _location = new LocationBO();
        }

        public LocationController(LocationBO location)
        {
            _location = location;
        }

        // GET: api/Values
        public async Task<IList<UserLocationModel>> Get(string key)
        {
            return await _location.Get(key);
        }

        // POST: api/Values
        public async Task<bool> Post(UserLocationModel model)
        {
            return await _location.Add(model);
        }

        // GET: api/Location/VisitorCount
        [HttpGet]
        public async Task<int> VisitorCount()
        {
            return await _location.Count(); ;
        }

        // DELETE: api/Values/5
        public void Delete(int id)
        {
        }
    }
}
