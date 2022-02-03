---
sidebar_position: 1
title: Topology 
---

One of the main sources of truth used in the Monitoring Service is the topology. It helps to discover and map relationships between services / resources. Via the topology the owner may have in-depth visibility into the infrastructure, by enabling the Monitoring Service to categorize, classify, and finally monitor the services in it. 

Topology includes all the necessary information about how an infrastructure is structured and organized.  ARGO Monitoring Service via the connectors (components used to connect to well known Configuration Databases (DPMT, GOCDB, csv files, json) retrieves information about the infrastructure, the hierarchy of the services that will be monitored, and  the service owners.

**Topology information includes :**
* the monitored services
* the way they are organized  (ex. in groups of sites, in groups of services, in projects). The Service can model different types of infrastructure architectures
* the service actors (owners, admins)

The ways the services are organized (sites, services, projects)  can be part of a bigger structure, that gathers a number of groups. 

Organisations offer services that can be grouped based on the location (SITES) , or based on the project they are used by (PROJECT) . This can be one more level to the topology hierarchy. The topology should also provide information about this bigger group , it's type and the services it contains.

The ARGO Monitoring Service allows the users to model their infrastructure by defining multiple level of groups, starting from groups of Service Endpoints and moving to higher level groups of groups. In this way it is easy to model different infrastructure architectures. We have to mention here that the levels of the topology is something that can be updated and depends on the requirements of each infrastructure.

But before we start lets explain a few acronyms. 


|       **Type**   |  **Description**    	|    **Example**         	|
|--------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|-----------------------------------------------------------------------------------------------------------------------------	|
| **Grouping**       	| A way to organize and group the services <br />**SITE**  An organization responsible for the service <br />**PROJECT**  When you offer services on behalf of a project <br /> **SERVICE GROUPS**  A group of related services 	| **SITE**  GRNET <br />**PROJECT**  MyProject <br />**SERVICE GROUP**  Cluster of databases                                              	|
| **Service Type**   	| Each service type can have a defined sets of metrics, which are explicit tests when we check                                                                                                                	| repository                                                                                                                  	|
| **Endpoint**       	| the combination of hostname and Service Type, defining where the service runs                                                                                                                               	| a repository at www.example-repository.com uses port 4333                                                                   	|
| **Service actors** 	| the people responsible for the service operation                                                                                                                                                            	| Administrator : John Smith jsmith [AT] grnet.gr <br />Site Owner: John Doe jDoe [AT] grnet.gr <br />Security: George Papadopoulos jpapad [AT]  grnet.gr 	|

## Examples

Via a Topology the structure of  a Project , an Organization, a SITE, can be monitored. For example: 

### Example 1: Monitoring the services of a Project- The topology:

When we participate at a Project we offer a number of services. Based on this a project gathers the services to offer to a higher level and creates one more level of hierarchy. Project acts as a group, at the top level of the infrastructure definition.  

```
Project   
   |---Service or Group of services                 
             |--Service Endpoints 
```

As an example, we may say that we have a project (MyProject) which offers an AAI Service and a Document Management Service. The information about the topology includes the group  (MyProject) , the services (AAI service, Document Management Service) that combine the service endpoints (aai.myproject.org, aai1.myproject.org) and (docu.myproject.org, database.myproject.org) . The following image is trying to represent the hierarchy of the topology. 

```
                                    MyProject
        |---AAI service                            |---Document Management Service                  
            |------aai.myproject.org                   |------docu.myproject.org
            |------aai1.myproject.org                  |------database.myproject.org  
```

### Example 2: Monitoring the services of 1 or more Organisations - The topology:

Another way to organise the topology is to add a new layer of group which is the Organisations. An Organisation usually has a number of Sites where it hosts the services used by the users. In the following example the hierarchy of this type of topology is represented. 

```
ORGANINATION 
   |----SITE   
        |---Service or Group of services                 
            |------Service Endpoints 

```

As an example,  we may say that we have an organization , such as GRNET , which has a number of Sites like HEBLAB ,IASA,EKT. Each Site gathers a number of services like SRM and WEBDAV.  These services combine a number of  like service-endpoints grid02.physics.uoi.gr , se01.marie.hellasgrid.gr, se01.athena.hellasgrid.gr. The following image is trying to represent the hierarchy of the topology. 

```
                                            GRNET 
|---- HEBLAB
	     |-- SRM 
		       |-- grid02.physics.uoi.gr
|---- IASA 
         |-- WEBDAV 
               |-- se01.marie.hellasgrid.
|---- EKT
         |-- SRM 
               |-- se01.athena.hellasgrid.gr
```


A visual representation of the above topology example can be represented from the image below: 

![](/img/infofeeds/topology.png) 


Monitoring Service has a number of connectors for well-known configuration databases and sources like: 

 - DPMT (Data Project Management Tool, that also manages topology and resources information)  
 - GOCDB (Repository for storing and presenting topology and resources information) 
 - CSV files (predefined format)
 - Json files (predefined format)


An example of the Json file is as follows: 

```
[ 
  {
"Service Description (Alphanumeric and basic punctuation)": "My service", 
"URL": "https://example.com", 
"SITENAME-SERVICEGROUP": "MY_SITE", 
"Service Unique ID": "1234", 
"COUNTRY_NAME": "Greece", 
"notification flag?": "Yes", 
"CONTACT_EMAIL": "address@example.com", 
"Status ": "Development", 
"SERVICE_TYPE": "my.service.type"
  } 
…
]

```


 - xml files  (predefined format)             

