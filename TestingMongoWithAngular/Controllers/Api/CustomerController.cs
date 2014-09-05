using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestingMongo;
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

        [HttpGet]
        public HttpResponseMessage GetCustomer(string id)
        {
            var customer = _customerService.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, customer);
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
