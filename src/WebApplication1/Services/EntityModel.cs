using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApplication1.Models.ViewModel;

namespace WebApplication1.Services
{
    public sealed class EntityModel
    {
        private static EntityModel _instance = null;
        private static readonly object objLock = new object();

        public List<UserLocationModel> UserLocations { get; set; }

        public static EntityModel Instance
        {
            get
            {
                lock (objLock)
                {
                    if (_instance == null)
                    {
                        _instance = new EntityModel();
                    }
                    return _instance;
                }
            }
        }

        private EntityModel()
        {
            UserLocations = getUserLocations();
        }

        private List<UserLocationModel> getUserLocations()
        {
            return new List<UserLocationModel>
            {
                new UserLocationModel{UserName="Furhan",Position=new GeoLocationRemark{Latitude=28.0667,Logitude=52.5577,Remark="My first Day"}},
                new UserLocationModel{UserName="Arshad",Position=new GeoLocationRemark{Latitude=24.0667,Logitude=48.5577,Remark="New way"}},
                new UserLocationModel{UserName="Aasif",Position=new GeoLocationRemark{Latitude=20.0667,Logitude=46.5577,Remark="My best restaurant"}},
                new UserLocationModel{UserName="Asad",Position=new GeoLocationRemark{Latitude=26.0667,Logitude=44.5577,Remark="My first checkIn"}},
                new UserLocationModel{UserName="Ayaz",Position=new GeoLocationRemark{Latitude=32.0667,Logitude=42.5577,Remark="a new look"}},
                //new UserLocationModel{UserName="Furhan",Position=new GeoLocationRemark{Latitude=26.0667,Logitude=50.5577,Remark="In Bahrain, Alone"}}
            };
        }
    }
}