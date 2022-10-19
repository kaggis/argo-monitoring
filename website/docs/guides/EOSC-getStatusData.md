---
sidebar_position: 7
title: "Get Monitoring Status Data based on the Resource-ID"
---


## Introduction

This use case covers the scenario of getting status data from the EOSC-Monitoring Service based on the resource-id. 
One scenario is to get the status data of a service Onboarded to EOSC via the Providers Portal.
Based on the Service-ID of the service from the  Providers Portal you can get the status from the monitoring service.

## Solution

When a resource is on-boarded in the Providers Portal is automatically get a resource-id. By the time it is on-boarded, it is also integrated with 
EOSC-Core services like Monitoring. The Monitoring Service based on the data defined in the Providers Portal, starts monitoring the resource and 
creates near real time status reports, and availability and reliability reports. This is the information a customer can get for a resource. In this 
guide we describe how the customer can get the Status data for a specific resource-id.

In order to start getting status monitoring data for a service or a list of services, a customer should follow the steps described below. 

### Step 1: Request an account

The first step to start using/testing the service is to request an account via the EOSC helpdesk and from the unit monitoring service. 
Just create a ticket with the title Account request to fetch the status of the services. 
In the description of the ticket please describe the use case and the service that needs this type of monitoring data. 

**Example**
 
 _Title_: Account request to fetch the status of the services
 _Description_: I am the service owner of EOSC Marketplace and i would like to display the status monitoring data. I would like to request an accoount 
 to get access to the onboarded resources.  

### Step 2 The response 

In the respose you will get the following information 


| Name            | Description                                                                                           | 
| --------------- | ----------------------------------------------------------------------------------------------------- | 
| _report_name_ | The Name of the report that contains information about the status of the resource id. |
| _URL_ | The URL where you may find the  api |
| _account details_ | Your account details. We usually send them via another service (dnote) for security reasons|



### Step 3 Start using the api 

By the time you have the data described in the previous step, you can start using the API. 
The API method supports 2 different methods 
 - a simple form: It will return the latest status result for the requested resource-id. With `view=details` the user can examine a detailed timeline for the current day, or specify a different period of time (using `start_time` and `end_time`)
 - an advanced form: This form supports a number of filters which help the customer get more information about the requested resource-id. 
   - `?view=details`: to view the most recent timeline of results for the requested resource-id
   - `start_time`: a parameter to view the detailed timeline of results for this specific resource-id under a certain period of time
   - `end_time`: the end_time of the period requested 

You may test the API call or get detailed information about the API method in the following links. 

[Details of the API Call](https://argoeu.github.io/argo-web-api/docs/apiv3/v3_status_results/#get-list-latest-status-result-for-a-specific-endpoint-using-its-resource-id) 

[Test it online: Status Results (v3): GET /v3/status/{report_name}/id/{resource_id}](https://argoeu.github.io/argo-web-api/openapi/explore#/Status%20Results%20(v3)/statusEndpointsByID)



#### Example Request 1: Latest status result for endpoint with id: simple-queue

##### Request

###### Method
`HTTP GET`

###### Path


```
/api/v2/status/Report_A/id/simple-queue
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
            "hostname": "queue01.example.com",
            "service": "compute.queue",
            "group": "Infra-01",
            "info": {
                "URL": "http://submit.queue01.example.com"
            },
            "statuses": [
                {
                    "timestamp": "2022-10-12T13:25:26Z",
                    "value": "OK"
                }
            ]
        }
    ]
}
```

