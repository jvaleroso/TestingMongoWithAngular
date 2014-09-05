using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Batch;
using System.Web.Routing;


namespace TestingMongoWithAngular
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                "GetCustomerById",
                "api/Home/{id}",
                new { controller = "Home", action = "GetCustomer" },
                new { httpMethod = new HttpMethodConstraint("GET") })
            ;

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
