---
sidebar_position: 7
title: "Get Monitoring A/R Data based on the Resource-ID"
---


## Introduction

This use case covers the scenario of getting (A/R) Availability and Reliability data from the EOSC-Monitoring Service based on the resource-id. 
One scenario is to get the A/R data of a service Onboarded to EOSC via the Providers Portal.
Based on the Service-ID of the service from the  Providers Portal you can get the A/R from the monitoring service.

Before we start 

**Availability**: Service Availability is the fraction of time a service was in the UP Period during the known interval in a given period.  Availability rate is useful to know, as it provides information of the time the monitored item is available for use.
**Reliability**: Service Reliability is the ratio of the time interval a service was UP over the time interval it was supposed (scheduled) to be UP in the given period. Reliability rate is also useful to know, as it provides information about the quality of monitored item during the monitoring time, whereas it is reliable of usage or not.

More information about Availability/Reliability can be found from [here](https://argoeu.github.io/argo-monitoring/docs/reports/ar?_highlight=avail#availability-reliability) 

## Solution

When a resource is on-boarded in the Providers Portal is automatically gets a resource-id. By the time it is on-boarded, it is also integrated with 
EOSC-Core services like Monitoring. The Monitoring Service based on the data defined in the Providers Portal, starts monitoring the resource and 
creates near real time status reports, and availability and reliability reports. This is the information a customer can get for a resource. In this 
guide we describe how the customer can get the A/R data for a specific resource-id.

In order to start getting A/R monitoring data for a service or a list of services, a customer should follow the steps described below. 

### Step 1: Request an account

The first step to start using/testing the service is to request an account via the EOSC helpdesk and from the unit monitoring service. 
Just create a ticket with the title Account request to fetch the status of the services. 
In the description of the ticket please describe the use case and the service that needs this type of monitoring data. 

**Example**
 
 _Title_: Account request to fetch monitoring data of a service
 _Description_: I am the service owner of EOSC Marketplace and i would like to display the monitoring data. I would like to request an account 
 to get access to the onboarded resources. 
 
 If you already have an account and you are fetching the status data you can just ask access for the A/R monitoring data. 
 

### Step 2 The response 

In the response you will get the following information 


| Name            | Description                                                                                           | 
| --------------- | ----------------------------------------------------------------------------------------------------- | 
| _report_name_ | The Name of the report that contains information about the status of the resource id. |
| _URL_ | The URL where you may find the  api |
| _account details_ | Your account details. We usually send them via another service (dnote) for security reasons|



### Step 3 Start using the api 

By the time you have the data described in the previous step, you can start using the API. 

The API method supports the following parameters 
   - `?granularity=monthly|daily`: to view monthly of daily A/R results for the requested resource-id. (start and end_time are required)
   - `start_time`: a parameter to view the A/R  results for this specific resource-id under a certain period of time
   - `end_time`: the end_time of the period requested 

You may test the API call in the following links. 

[Details of the API Call](????) 

[Test it online: AR Results (v3): GET /v3/results/{report_name}/id/{resource_id}](???)

#### Example Request 1: default daily granularity with specific resource-id

##### Request

###### Method
`HTTP GET`

###### Path


```
/api/v3/results/Report_A/id/simple-queue?start_time=2015-06-20T12:00:00Z&end_time=2015-06-26T23:00:00Z 
```

###### Headers

```
x-api-key: "tenant_key_value"
Accept: "application/json"
```

##### Response

###### Code

```
Status: 200 OK
```

###### Body

```json
{
  "id": "simple-queue",
  "endpoints": [
    {
      "name": "host01.example",
      "service": "service.queue",
       "group": "Infra-01",
            "info": {
                "URL": "http://submit.queue01.example.com"
            },
      "results": [
        {
          "date": "2015-06-22",
          "availability": "99.99999900000002",
          "reliability": "99.99999900000002",
          "unknown": "0",
          "uptime": "1",
          "downtime": "0"
        }
    ]
  ]
}
```

