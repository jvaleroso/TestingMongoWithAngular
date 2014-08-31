using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Configuration;
using System.Linq;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using TestingMongo.Data;

namespace TestingMongo.Mongo.Dao
{
    public class CustomerDao : ICustomerDao
    {
        private const string CustomerCollectionName = "customer";
        private readonly MongoContext _mongoContext;

        public CustomerDao(MongoContext mongoContext)
        {
            _mongoContext = mongoContext;
        }

        public IList<Customer> GetList()
        {
            return _mongoContext.GetCollection(CustomerCollectionName)
                .FindAllAs<Customer>().ToList();
        }

        public void Save(Customer customer)
        {
            _mongoContext.GetCollection(CustomerCollectionName).Insert(customer);
        }

        public void Update(Customer customer)
        {
            _mongoContext.GetCollection(CustomerCollectionName).Save(customer);
        }

        public void Delete(Customer customer)
        {
            var query = Query<Customer>.EQ(c => c.Id, customer.Id);
            _mongoContext.GetCollection(CustomerCollectionName).Remove(query);
        }

        public Customer GetById(string id)
        {
            var query = Query<Customer>.EQ(c => c.Id, id);
            return _mongoContext.GetCollection(CustomerCollectionName).FindOneAs<Customer>(query);
        }
    }
}
