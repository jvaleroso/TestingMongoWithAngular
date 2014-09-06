using System.Collections.Generic;

namespace TestingMongo.Data
{
    public interface ICustomerDao
    {
        IList<Customer> GetList();
        void Save(Customer customer);
        void Update(Customer customer);
        void Delete(Customer customer);
        Customer GetById(string id);
    }
}
