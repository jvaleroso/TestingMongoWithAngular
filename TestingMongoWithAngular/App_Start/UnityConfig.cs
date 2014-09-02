using Microsoft.Practices.Unity;
using System.Web.Http;
using TestingMongo.Data;
using TestingMongo.Mongo;
using TestingMongo.Mongo.Dao;
using TestingMongo.Services;
using Unity.WebApi;

namespace TestingMongoWithAngular
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            container.RegisterInstance(container);

            #region Daos

            container.RegisterType<ICustomerDao, CustomerDao>(new ContainerControlledLifetimeManager());

            #endregion

            #region Services

            container.RegisterType<ICustomerService, CustomerService>(new ContainerControlledLifetimeManager());

            #endregion

            container.RegisterInstance(typeof (MongoContext), new MongoContext(),
                new ContainerControlledLifetimeManager());

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}