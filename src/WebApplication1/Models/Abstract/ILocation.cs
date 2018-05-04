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
    public interface ILocation
    {
        /// <summary>
        /// List of all users
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<IList<UserLocationModel>> Get(string key);

        Task<bool> Add(UserLocationModel model);

        Task<int> Count();
    }
}
