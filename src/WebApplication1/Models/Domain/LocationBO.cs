using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Models.Abstract;
using WebApplication1.Models.Entity;
using WebApplication1.Models.ViewModel;

namespace WebApplication1.Models.Domain
{
    public class LocationBO
    {
        private ILocation _location = null;

        public LocationBO()
        {
            _location = new LocationRepo();
        }

        /// <summary>
        /// Doing for Unit Testing Dependecy resolver
        /// </summary>
        /// <param name="appUserRepo"></param>
        public LocationBO(ILocation location)
        {
            this._location = location;
        }

        public async Task<IList<UserLocationModel>> Get(string key)
        {
            return await _location.Get(key);
        }

        public async Task<bool> Add(UserLocationModel model)
        {
            return await _location.Add(model);
        }        

        public async Task<int> Count()
        {
            return await _location.Count();
        }
    }
}