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
    public class AppUserRepo : IAppUser
    {
        private EntityModel _ent = null;
        public AppUserRepo()
        {
            _ent = EntityModel.Instance;
        }

        public async Task<IList<UserLocationModel>> GetUserLocations(string key)
        {
            return _ent.UserLocations.Where(x => x.UserName.Contains(key) || x.Position.Remark.Contains(key)).ToList();
        }

        public async Task<bool> Add(UserLocationModel model)
        {
            _ent.UserLocations.Add(model);
            return true;
        }

        public async Task<ViewModel.ProfileModel> GetUser(string userName)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SignIn(string userName, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<string> SignUp(string fullName, string userName, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<string> ForgotPassword(string userName)
        {
            throw new NotImplementedException();
        }

        public async Task<string> ResetPassword(string userName, string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }
    }
}