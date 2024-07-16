namespace WebApiMongoDB_1.Data
{
    public class DatabaseSettings
    {
        public string CollectionName { get; set; }
        public string DatabaseName { get; set; }
        public string Connection { get; set; }
    }
}

/* 
Namespaces are used in C# to organize code into a hierarchical structure,
which helps to manage and group related classes, interfaces, and other types.
This organization prevents naming conflicts by providing a way to fully qualify the names of types.

namespace Company.Project.Module
{
    public class SomeClass
    {
        // Implementation
    }
}

namespace Company.Project.AnotherModule
{
    public class SomeClass
    {
        // Different implementation
    }
}

In this example, there are two classes named SomeClass, but they belong to different namespaces 
(Company.Project.Module and Company.Project.AnotherModule), so they can coexist without any conflict.
*/