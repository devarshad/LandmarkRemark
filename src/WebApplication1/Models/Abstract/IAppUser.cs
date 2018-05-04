using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1.Models.ViewModel;

namespace WebApplication1.Models.Abstract
{
    /// <summary>
    /// Managing user actions
    /// </summary>
    public interface IAppUser
    {
        /// <summary>
        /// List of all users
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<IList<UserLocationModel>> GetUserLocations(string key);

        /// <summary>
        /// Get profile of any user
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        Task<ProfileModel> GetUser(string userName);
        /// <summary>
        /// SignIn of application user
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task<string> SignIn(string userName, string password);

        /// <summary>
        /// SignUp for New user
        /// </summary>
        /// <param name="fullName"></param>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task<string> SignUp(string fullName, string userName, string password);

        /// <summary>
        /// Forget password utility
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        Task<string> ForgotPassword(string userName);

        /// <summary>
        /// Reset password utiliy
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPassword"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        Task<string> ResetPassword(string userName, string oldPassword, string newPassword);

        Task<bool> Add(UserLocationModel model);
    }
}
