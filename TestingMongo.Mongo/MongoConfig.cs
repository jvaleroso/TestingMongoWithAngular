using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.IdGenerators;

namespace TestingMongo.Mongo
{
    public class MongoConfig
    {
        private static void RegisterClassMap<T>() where T : IModel
        {
            BsonClassMap.RegisterClassMap<T>(cm =>
            {
                cm.AutoMap();
                var idMemberMap = cm.GetMemberMap(t => t.Id);
                idMemberMap.SetIdGenerator(new StringObjectIdGenerator());
            });
        }

        public static void RegisterClassMaps()
        {
            var convention = new ConventionPack
            {
                new CamelCaseElementNameConvention()
            };

            ConventionRegistry.Register("mongoAngular", convention, _ => true);

            RegisterClassMap<Customer>();
        }
    }
}