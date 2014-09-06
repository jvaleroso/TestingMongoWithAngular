using System.Collections.Generic;

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
