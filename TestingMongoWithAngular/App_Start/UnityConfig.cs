﻿using System;
using Microsoft.Practices.Unity;
using TestingMongo.Data;
using TestingMongo.Mongo;
using TestingMongo.Mongo.Dao;
using TestingMongo.Services;

namespace TestingMongoWithAngular
{
    public static class UnityConfig
    {
        private static readonly Lazy<IUnityContainer> Container = new Lazy<IUnityContainer>(CreateContainer);

        public static IUnityContainer GetConfiguredContainer()
        {
            return Container.Value;
        }
  
        public static UnityContainer CreateContainer()
        {
            var container = new UnityContainer();

            container.RegisterInstance(container);

            #region Daos

            container.RegisterType<ICustomerDao, CustomerDao>(new ContainerControlledLifetimeManager());

            #endregion

            #region Services

            container.RegisterType<ICustomerService, CustomerService>(new ContainerControlledLifetimeManager());

            #endregion

            container.RegisterInstance(typeof(MongoContext), new MongoContext(),
                new ContainerControlledLifetimeManager());

            return container;
        }
    }
}