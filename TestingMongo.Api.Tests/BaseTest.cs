using System;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using FakeItEasy;
using Microsoft.Practices.Unity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestingMongo.Services;
using TestingMongoWithAngular;

namespace TestingMongo.Api.Tests
{
    public class BaseTest
    {
        protected ICustomerService CustomerService;

        [TestInitialize]
        public virtual void Initialize()
        {
            CustomerService = A.Fake<ICustomerService>();
            // Microsoft.Practices.Unity is required in namespace for this
            // Using UnityContainerExtensions class
            UnityConfig.GetConfiguredContainer().RegisterInstance(CustomerService);
        }

        public void PerformRequest(HttpMethod httpMethod,
            string uri,
            HttpContent httpContent,
            Action<HttpResponseMessage> assertAction)
        {
            var config = new HttpConfiguration {IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always};
            
            //WebApi route MUST me configured always!
            WebApiConfig.Register(config);

            //IMPORTANT! Always set the DependencyResolver of the HttpConfiguration
            UnityWebApiActivator.PopulateConfiguration(config);

            var server = new HttpServer(config);

            //Do not put HttpMessageInvoker in using statement. Causes stack overflow
            var client = new HttpMessageInvoker(server);

            using (var request = new HttpRequestMessage(httpMethod, uri))
            {
                if (httpContent != null) request.Content = httpContent;
                using (var response = client.SendAsync(request, CancellationToken.None).Result)
                {
                    assertAction(response);
                }
            }
        }
    }
}
