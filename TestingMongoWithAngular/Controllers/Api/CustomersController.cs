using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestingMongo;
using TestingMongo.Services;

namespace TestingMongoWithAngular.Controllers.Api
{
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
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
        [Route("{id}")]
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
            return Request.CreateResponse(HttpStatusCode.Created, customer);
        }

        [HttpDelete]
        public HttpResponseMessage DeleteCustomer(string id)
        {
            var customer =_customerService.GetById(id);
            if (customer != null) ;
            _customerService.Delete(customer);

            return Request.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
