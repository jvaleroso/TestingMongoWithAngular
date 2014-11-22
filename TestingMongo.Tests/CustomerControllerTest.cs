using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using TestingMongo.Services;
using TestingMongoWithAngular;

namespace TestingMongo.Tests
{
    [TestClass]
    public class CustomerControllerTest
    {
        [TestMethod]
        public void GetCustomers_Test()
        {
            UnityConfig.RegisterComponents();
    
            var config = new HttpConfiguration{ IncludeErrorDetailPolicy = IncludeErrorDetailPolicy.Always};

            WebApiConfig.Register(config);

            var server = new HttpServer(config);

            var customers = new List<Customer>
            {
                new Customer {FirstName = "Jayson", LastName = "Valeroso", Address = "Taytay, Rizal"},
                new Customer {FirstName = "Roj", LastName = "Berana", Address = "Calamba, Laguna"}
            };

            var customerService = A.Fake<ICustomerService>();

            A.CallTo(() => customerService.GetList()).Returns(customers);

            using (var client = new HttpMessageInvoker(server))
            {
                using (var request = new HttpRequestMessage(HttpMethod.Get, "http://localhost/api/customers"))
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
}   
