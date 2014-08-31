using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestingMongo
{
    public class Customer : IModel
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleInitial { get; set; }
        [BsonDateTimeOptions(DateOnly = true)]
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
    }
}
