---
sidebar_position: 2
title: Aggregation Profile  
---

## Description 

An aggregation profile defines how to aggregate service 
statuses into higher hierarchical grouping (i.e. a service_group) status results. 
They are actually used to define logical rules on how to aggregate individual status computations into groups.

### Grouping of monitored items

ARGO allows you to combine your monitored items into hierarchies of groups giving you the ability to represent real world structures of your data centers, organizations, service offerings, federations etc. The most basic level that everything else is built upon is the level of the service endpoint.

A service endpoint is actually the host plus the service instance that runs on that host. For example you might have a bare metal machine (host) named db01.example.com that hosts an instance of a mysql database on port 3306. In this example the service endpoint being the combination of the hostname plus the type of the service running on the host gives:

`service endpoint = db01.infra.example.com(mysql)`

### Combining endpoints to service offerings

You might offer mysql as a cluster which actually depends on the following service endpoints such as:
- `db01.infra.example.com(mysql)`
- `db02.infra.example.com(mysql)`
- `db03.infra.example.com(mysql)`

Now you want to have a combined view for the service offering (mysql cluster) as a whole that includes a daily timeline of the status that your mysql offering and the corresponding availability / reliability score results. The mysql cluster might be deployed in an distributed way so that every host must be in a working OK condition in order to consider that the general mysql offering is OK. Or it might be deployed in a high availability fashion so even if one of the service endpoints is in working condition (OK state) the whole mysql offering is considered to be working (OK). As mentioned previously, operation profiles describe the ways that we combine items into groups based on the way they are working together (distributed/ha). Usually an operation profile declares possible states that monitored items might have and how these states are combined through combine operations/actions (namely “AND”, “OR” logical operations between items as described here: [link](operations-profile.md)



Important: If operations profile describe the available states and the combination operations possible upon them, the aggregation profile describes where those operation take place in the hierarchy of groups we are trying to create

In the previous example of mysql service offering the aggregation profile will include a declaration that endpoints of mysql service types are combined into service groups of mysql offerings through an ‘OR’ combination operation because our mysql clusters are deployed in a highly available way. 

### Combining service offerings to higher groups

You might have another service offering in your infrastructure that provides along with the database a cloud storage platform such as nextcloud. Similar to the database you might have the following endpoints:

- `cloud01.infra.example.com(nextcloud)`
- `cloud02.infra.example.com(nextcloud)`

And you want to combine them in a single nextcloud offering that actually is distributed among them so you must combine them in an “AND” fashion (again see  [link](operations-profile.md)) 

The aggregation profile in this case will include another entry that defines that the nextcloud endpoints are combined through an ‘AND’ operation to a higher level nextcloud service offering.

Finally you might want to provide a high level group of your infrastructure that includes all service offerings (mysql and nextcloud). In this case you might have something like:

```
infra.example.com (my infrastructure)
      |
      |
  (*offers)
      |
      |________ nextcloud service
      |                 |
      |                 |
      |       (*has HA components)
      |                 |
      |                 |__ db01.infra.example.com
      |                 |__ db02.infra.example.com
      |                 |__ db03.infra.example.com
      |
      |_________mysql service
                        |
                        |
           (*has distributed components)
                        |
                        |__ cloud01.infra.example.com
                        |__ cloud02.infra.example.com
```
                                

So the case might be that the nextcloud service and the mysql service must be combined in an ‘AND’ fashion in order to provide a general picture for the whole infrastructure (infra.example.com). This is also something that we define in the aggregation profile.

To sum it up, the aggregation profile comes along with the operation profile and defines what kind of levels and groups our monitored items are going to be combined to and with what kind of operations (AND/OR etc…). The operations are declared and named on the operations profile and they are referenced by name in the aggregations profile. In the aggregation profile you cannot have references to operations that don’t exist in the accompanied aggregation profile. 

### Aggregation profile anatomy (JSON format)

The aggregation profile has the following information:
- A name _(obviously)_
- A reference to a metric profile attached to it _(to know what kind of service types are relevant)_
- The type of high level group representation that our service offerings are organized to _(for example: DATACENTER, INFRASTRUCTURE, ORGANIZATION, SITE, SERVICEGROUP etc…)_
- Some general types of combination operations applied globally such as:
  - How are the individual metrics/checks are going to be combined for each endpoint
  - How are the different high level groups are going to be combined to a final group etc…
- A detailed list of the high level groups we want to construct _(representing as mentioned before data centers or infrastructures, or sites, or service groups etc…)_ and with what kind of operations each individual service type is combined to these groups

The JSON format representation of an aggregation profile is provided in the following example:


```json
{
           "name": "Infra_aggregation",
           "endpoint_group": "DATACENTER",
           "metric_operation": "AND",
           "profile_operation": "AND",
           "metric_profile": {
               "name": "my_infra_metrics",
               "id": "uuid-reference-here"
           },
           "groups": [
               {
                   "name": "database",
                   "operation": "OR",
                   "services": [
                       {
                           "name": "mysql",
                           "operation": "OR"
                       }
                   ]
               },
               {
                   "name": "storage",
                   "operation": "OR",
                   "services": [
                       {
                           "name": "nextcloud",
                           "operation": "AND"
                       }
                   ]
               }
           ]
}
```
