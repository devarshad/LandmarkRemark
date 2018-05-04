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
    public class AppUserController : ApiController
    {
        private AppUserBO _appUserBO = null;

        public IList<StudentModel> data { get; set; }

        public AppUserController()
        {
            _appUserBO = new AppUserBO();
        }

        public AppUserController(AppUserBO testUserBO)
        {
            _appUserBO = testUserBO;
        }
        // GET: api/Values
        public async Task<IList<UserLocationModel>> GetUserLocations(string s)
        {
            return await _appUserBO.GetUserLocations(s);
        }

        // POST: api/Values
        public async Task<bool> PushUserLocations(UserLocationModel model)
        {
            return await _appUserBO.Add(model);
        }

        // DELETE: api/Values/5
        public void Delete(int id)
        {
        }
    }
}
