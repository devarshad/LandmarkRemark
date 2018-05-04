using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using WebApplication1.Models.Abstract;
using WebApplication1.Models.ViewModel;
using WebApplication1.Services;

namespace WebApplication1.Models.Entity
{
    public class LocationRepo : ILocation
    {
        private EntityModel _ent = null;
        public LocationRepo()
        {
            _ent = EntityModel.Instance;
        }

        public async Task<IList<UserLocationModel>> Get(string key)
        {
            if (string.IsNullOrWhiteSpace(key))
            {
                return _ent.UserLocations.ToList();    
            }
            return _ent.UserLocations.Where(x => x.UserName.Contains(key) || x.Position.Remark.Contains(key)).ToList();
        }

        public async Task<bool> Add(UserLocationModel model)
        {
            _ent.UserLocations.Add(model);
            return true;
        }

        public async Task<int> Count()
        {
            return _ent.UserLocations.Count();
        }
    }
}