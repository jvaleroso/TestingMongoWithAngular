using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using FakeItEasy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace TestingMongo.Api.Tests
{
    [TestClass]
    public class CustomerControllerTest : BaseTest
    {
        [TestInitialize]
        public void Initialze()
        {
            Initialize();
        }

        [TestMethod]
        public void Test_GetCustomers()
        {
            var customers = new List<Customer>
            {
                new Customer {FirstName = "Jayson", LastName = "Valeroso", Address = "Taytay, Rizal"},
                new Customer {FirstName = "Roj", LastName = "Berana", Address = "Calamba, Laguna"}
            };

            A.CallTo(() => CustomerService.GetList()).Returns(customers);

            PerformRequest(HttpMethod.Get,
                "http://localhost/api/customers",
                null,
                response =>
                {
                    var customerResponse = JsonConvert.DeserializeObject<IList<Customer>>
                        (response.Content.ReadAsStringAsync().Result);

                    Assert.IsNotNull(response);
                    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
                    Assert.AreEqual(customers.Count, customerResponse.Count);
                });
        }

        [TestMethod]
        public void Test_GetCustomerById()
        {
            var customers = new List<Customer>
            {
                new Customer {Id = "jaysonfv", FirstName = "Jayson", LastName = "Valeroso", Address = "Taytay, Rizal"},
                new Customer {Id = "rojab", FirstName = "Roj", LastName = "Berana", Address = "Calamba, Laguna"}
            };

            A.CallTo(() => CustomerService.GetById(customers[0].Id)).Returns(customers[0]);

            PerformRequest(HttpMethod.Get,
                string.Format("http://localhost/api/customers/{0}", customers[0].Id),
                null,
                response =>
                {
                    var customerResponse = JsonConvert.DeserializeObject<Customer>
                        (response.Content.ReadAsStringAsync().Result);

                    Assert.IsNotNull(response);
                    Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
                    Assert.AreEqual(customers[0].FirstName, customerResponse.FirstName);
                });
        }
    }
}
