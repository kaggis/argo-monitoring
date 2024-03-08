---
sidebar_position: 6
title: "Use Case  5: Third-party services exploiting EOSC Monitoring data"
---


## Introduction

This use case covers the scenario according to which the customer needs to use the results of the EOSC Monitoring Service in an external service/dashboard. 

The customer can access the following information via an API: 

* A/R information about the service and its service components 
* Status information about the service and its service components
* The topology and grouping of the service 

## Solution 

### Step 1: EOSC helpdesk

Τhe user that wants to gain access to this type of monitoring information will get a token with read-only access to the A/R and status results. The user via the EOSC helpdesk may send his request to the monitoring team by sending:

* The name of the service that wants the information 
* An email to create the user 
* The type of information (A/R results, status results, both) 

### Step 2: Start Ingesting the data. 

The monitoring team will provide the required  token and information, guidance on how to retrieve the information.  

## Examples 

##### Retrieve availability, reliability and status results of a service

In this example we are going to present how the user can get the availability,  the reliability values and the status of the AMS (Messaging Service)  (endpoint:  [https://msg.argo.grnet.gr](https://msg.argo.grnet.gr/)) of the Organisation GRNET. 

The Monitoring Service Monitoring Service is checking the services at regular intervals. It actually runs explicit tests (checks) in order to assess the status of the service. The result of the checks decides on the status of the service. In order to display status information it uses reports where it keeps all the necessary information. 

At the same time it produces useful conclusions about the monitoring item via the monitoring analytics engine. One very useful conclusion is to decide if the item is available for usage and if it is considered as reliable. To succeed this, availability/reliability values (hourly, daily, monthly)  are calculated. These different types of information are also encapsulated in a **report**. 

The EOSC monitoring service monitors the Messaging Service and it performs the following checks 

* `cert_validity_check` : a metric that checks the validity of the certificate used by the service
* `ams_check`: a metric that checks a list of functionalities provided by the messaging service. 

Based on the explanation provided above,  the information about the service follows:

Definition|Value|Description
|---|---|---
GROUP|GRNET|A collection of services 
SERVICE|AMS|The type of one of the services of the collection 
SERVICE endpoint|msg.argo.grnet.gr(AMS)|is defined as the combination of a hostname and Service Type. (a Service Type of AMS listening on port/s `<ams-port/s\>`on the host msg.argo.grnet.gr is a service endpoint) 
Grouping used in the report|SERVICEGROUPS|the way the services are organized (e.g. in groups of sites, in groups of services) in the monitoring engine
A/R report|Default|The place where the A/R results are provided. 
Status report|Default|The place where  status results are provided. 

This is the configuration that the user will have to use to use the api calls. 

##### API call examples for A/R reports

The api authenticates the user using the api-key within the x-api-key header. Users can specify time granularity (monthly or daily) for retrieved results and also format  using the Accept header. Depending on the form of the request the user can request a group, service or service endpoint. 

**Detailed documentation:**
[ARGO web api v3 a/r results](https://argoeu.github.io/argo-web-api/docs/apiv3/v3_ar_results)

**Example:**

For the AMS the corresponding api call to get the A/R of the service group GRNET is: 

_Request for A/R results for service group GRNET:_
```
$ curl -X GET -H "Accept: application/json" -H "Content-Type: application/json" -H "x-api-key: secret-token" https://api.argo.grnet.gr/api/v3/results/Default/SERVICEGROUPS/GRNET?start_time=2021-08-05T00:00:00Z&end_time=2021-08-05T23:59:59Z
```
  
##### API call examples for status reports

The api authenticates the user using the api-key within the x-api-key header. Users can specify time granularity (monthly or daily) for retrieved results and also format  using the Accept header. Depending on the form of the request the user can request a group, service or service endpoint. 

**Detailed documentation:**
[ARGO web api docs](https://argoeu.github.io/argo-web-api/)[ARGO web api v3 status results](https://argoeu.github.io/argo-web-api/docs/apiv3/v3_status_results)

**Example:**

For the AMS the corresponding api call to get the status of the service group GRNET is: 

_Request for status results for service group GRNET:_
```
$ curl -X GET -H "Accept: application/json" -H "Content-Type: application/json" -H "x-api-key: secret-token" https://api.argo.grnet.gr/api/v3/status/Default/SERVICEGROUPS/GRNET?start_time=2021-08-05T00:00:00Z&end_time=2021-08-05T23:59:59Z 
```