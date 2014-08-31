using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Web.Http;
using System.Web.Http.Results;
using TestingMongo;
using TestingMongo.Data;
using TestingMongo.Services;

namespace TestingMongoWithAngular.Controllers.Api
{
    public class CustomerController : ApiController
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public HttpResponseMessage GetCustomers()
        {
            var customers = _customerService.GetList();
            return Request.CreateResponse(HttpStatusCode.OK, customers);
        }

        [HttpPut]
        public HttpResponseMessage UpdateCustomer(Customer customer)
        {
            _customerService.Update(customer);
            return Request.CreateResponse(HttpStatusCode.OK, customer);
        }


        [HttpPost]
        public HttpResponseMessage SaveCustomer(Customer customer)
        {
            _customerService.Save(customer);
            return Request.CreateResponse(HttpStatusCode.OK, customer);
        }
    }
}
