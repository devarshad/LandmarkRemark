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
    public class AppUserBO
    {
        private IAppUser _appUserRepo = null;

        public AppUserBO()
        {
            _appUserRepo = new AppUserRepo();
        }

        /// <summary>
        /// Doing for Unit Testing Dependecy resolver
        /// </summary>
        /// <param name="appUserRepo"></param>
        public AppUserBO(IAppUser appUserRepo)
        {
            this._appUserRepo = appUserRepo;
        }

        public async Task<IList<UserLocationModel>> GetUserLocations(string key)
        {
            return await _appUserRepo.GetUserLocations(key);
        }

        public async Task<bool> Add(UserLocationModel model)
        {
            return await _appUserRepo.Add(model);
        }

        public async Task<ProfileModel> GetUser(string userName)
        {
            return await _appUserRepo.GetUser(userName);
        }

        public async Task<string> SignIn(string userName, string password)
        {
            return await _appUserRepo.SignIn(userName, password);
        }

        public async Task<string> SignUp(string fullName, string userName, string password)
        {
            return await _appUserRepo.SignUp(fullName, userName, password);
        }

        public async Task<string> ForgotPassword(string userName)
        {
            return await _appUserRepo.ForgotPassword(userName);
        }

        public async Task<string> ResetPassword(string userName, string oldPassword, string newPassword)
        {
            return await _appUserRepo.ResetPassword(userName, oldPassword, newPassword);
        }

    }
}