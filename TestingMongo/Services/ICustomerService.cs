using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestingMongo.Services
{
    public interface ICustomerService
    {
        IList<Customer> GetList();
        void Update(Customer customer);
        void Save(Customer customer);
        void Delete(Customer customer);
        Customer GetById(string id);
    }
}
