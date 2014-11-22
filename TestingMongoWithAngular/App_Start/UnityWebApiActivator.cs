using System.Web.Http;
using TestingMongoWithAngular;
using Unity.WebApi;
using WebActivatorEx;

[assembly: PreApplicationStartMethod(typeof(UnityWebApiActivator), "Start")]
[assembly: ApplicationShutdownMethod(typeof(UnityWebApiActivator), "Shutdown")]

namespace TestingMongoWithAngular
{
    public static class UnityWebApiActivator
    {
        /// <summary>
        /// Sets the DependencyResolver of the given HttpConfiguration to Unity.
        /// </summary>
        /// <param name="config"></param>
        public static void PopulateConfiguration(HttpConfiguration config)
        {
            config.DependencyResolver = new UnityDependencyResolver(UnityConfig.GetConfiguredContainer());
        }

        /// <summary>Disposes the Unity container when the application is shut down.</summary>
        public static void Shutdown()
        {
            var container = UnityConfig.GetConfiguredContainer();
            container.Dispose();
        }

        /// <summary>Integrates Unity when the application starts.</summary>
        public static void Start()
        {
            // Use UnityHierarchicalDependencyResolver if you want to use a new child container for each IHttpController resolution.
            // var resolver = new UnityHierarchicalDependencyResolver(UnityConfig.GetConfiguredContainer());
            var resolver = new UnityDependencyResolver(UnityConfig.GetConfiguredContainer());

            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }
    }
}