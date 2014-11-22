using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using FakeItEasy;
using Microsoft.Practices.Unity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using TestingMongo.Services;
using TestingMongoWithAngular;

namespace TestingMongo.Tests
{
    [TestClass]
    public class CustomerControllerTest
    {
        private ICustomerService _customerService;

        [TestInitialize]
        public void Initialze()
        {
            _customerService = A.Fake<ICustomerService>();
            UnityConfig.GetConfiguredContainer().RegisterInstance(_customerService);
        }

        [TestMethod]
        public void GetCustomers_Test()
        {
            var customers = new List<Customer>
            {
                new Customer {FirstName = "Jayson", LastName = "Valeroso", Address = "Taytay, Rizal"},
                new Customer {FirstName = "Roj", LastName = "Berana", Address = "Calamba, Laguna"}
            };

            A.CallTo(() => _customerService.GetList()).Returns(customers);

            var config = new HttpConfiguration { IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always };
            WebApiConfig.Register(config);
           
            //IMPORTANT! Always set the DependencyResolver of the HttpConfiguration
            UnityWebApiActivator.PopulateConfiguration(config);

            var server = new HttpServer(config);

            //Do not put HttpMessageInvoker in using statement. Causes stack overflow
            var client = new HttpMessageInvoker(server);

            using (var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost:52942/api/customers"))
            {
                using (var response = client.SendAsync(request, CancellationToken.None).Result)
                {
                    var customerResponse = JsonConvert.DeserializeObject<IList<Customer>>
                        (response.Content.ReadAsStringAsync().Result);

                    Assert.IsNotNull(response);
                    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
                    Assert.AreEqual(customers.Count, customerResponse.Count);
                }

            }
        }
    }
}
