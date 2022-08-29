---
sidebar_position: 4
title: "Use Case 3: Integrate  External  Monitoring  service"
---



## Introduction

In order to be able to scale-out and take advantage of existing Monitoring systems, the EOSC Monitoring service is capable of accepting data from external sources. When referring to external sources we mean other monitoring engines that want to connect with the EOSC Monitoring Service. This use case is split in two different sections as follows:

1. Case 3.1: Supported Monitoring Engine and Operating System (Nagios on Centos 7 or Debian 8).
2. Case 3.2 Other Monitoring Engine and Operating System

## Solution 

The connection of a monitoring system with EOSC is based mainly on the data that have the necessary information to create the final report. In this use case an external monitoring system replaces the internal monitoring engine and is thus reliable for the validity of the monitoring data that is published. 

### Step 1: EOSC helpdesk 

The interested party opens a ticket on EOSC Helpdesk requesting to start the process to connect to the EOSC Monitoring Service. During the preparation of its  request they need to prepare their systems to be able to provide the following information: 

* The type of system used
* Infrastructure topology
* Personnel responsible for managing the necessary profiles 
* URLs  for POEM and UI components. 

### Step 2: The Monitoring team creates a new Tenant. 

The monitoring team creates a new tenant on the monitoring service and at the same time requests from the messaging team to create the necessary configuration on the EOSC Messaging service.  As a result the team will then send to the customer the necessary instructions and access tokens to connect to the Monitoring Service. 

### Step 3: The monitoring team assists the interested party to create the necessary profiles.

The profiles that need to be defined 

* Metric Profile 
* Aggregation Profile.

### Step 4:  Publish Metric Data 

The customer will need to make the necessary configuration on their monitoring engine in order to start publishing metric data via the EOSC messaging service.  The EOSC Monitoring Service supports two options 

#### Case 3.1: Supported monitoring Engine and Operating System (Nagios on Centos 7 or Debian 8).

If the customers uses Nagios as its monitoring tool, EOSC Monitoring offers the argo-nagios-ams-publisher tool that is currently supported on Centos-7 and Debian-8\.  argo-nagios-ams-publisher is a component acting as a bridge from Nagios to ARGO Messaging system and finally to the ARGO Monitoring Engine. It is responsible for forming and dispatching messages that wrap up results from the monitoring engine. In order to use the this solution the customer  will need to :

**a)** Install argo-nagios-ams-publisher and ams-library
**b)** Configure argo-nagios-ams-publisher
**c)** Enable OCSP in Nagios:

In `/etc/nagios/nagios.cfg` add this configuration
```
obsess_over_services=1
ocsp_command=argo_service_check
ocsp_timeout=15
```
**d)** Add OCSP command:

should add an OCSP command in  `/etc/nagios/objects/commands.cfg`
```
define command {
       command_name argo_service_check
 command_line /usr/bin/ams-metric-to-queue --queue /var/spool/argo-nagios-ams-publisher/metrics/  --hostname "$HOSTNAME$" --status "$SERVICESTATE$" --summary "$SERVICEOUTPUT$" --message "$LONGSERVICEOUTPUT$" --servicestatetype "$SERVICESTATETYPE$" --actual_data "$SERVICEPERFDATA$" --service "$_SERVICESERVICE_FLAVOUR$" --metric "$_SERVICEMETRIC_NAME$"
}
```
**e)** All the Services to be published must have following attributes set:
```
define service {
 
    use                 generic-service; Name of service template to use
    host_name               grnet.gr
    service_description     HTTP
    check_command           check_http
    check_interval                  5
   _service_flavour   WebPortal //the service 
   _metric_name   org.nagios.WebCheck
}
```
**f)** Start argo-nagios-ams-publisher by executing:

`service ams-publisherd start`

  
#### Case 3.2 Other monitoring systems 

In this solution - use case the client cannot or doesn't want to use the solution described in the case 3.1 . Then the external monitoring system should find a way to send the monitoring data (metric data) to the EOSC Monitoring . These data should follow a predefined format. 

The data should be stamped with their source and timestamp. Every metric should be prefixed with \[source\_type\], following the metric naming best practises. Every metric is also labelled with the hostname and service description. These predefined messages should be sent to the EOSC Messaging service which is the service responsible to pass them to the computations engine which performs the necessary calculations to produce the reports. 
```json
{
  "hostname": "host101.example.com",
  "service": "eu.eosc.portal.services.url",
  "metric": "org.nagios.WebCheck",
  "timestamp": "2022-01-02T00:24:38Z",
  "status": "OK",
  "tags": {
    "endpoint_group": "GroupA"
  },
  "summary": "200 OK",
  "actual_data": "time=0.085796s;;;0.000000 size=1126B;;;0",
  "monitoring_host": "monbox.example.com",//name of the external monitoring box 
  "message": "a more detailed message about the monitoring result"
}
```
Metric data comes in the form of avro files, (json files support currently in development )  and contains timestamped status information about the hostname, service and specific checks (metrics) that are being monitored. A typical item of information in the metric data contains the field listed in the snippet below.

```json
{"namespace": "argo.avro",
"type": "record",
"name": "metric_data",
"fields": [
       {"name": "timestamp", "type": "string"},
       {"name": "service", "type": "string"},
       {"name": "hostname", "type": "string"},
       {"name": "metric", "type": "string"},
       {"name": "status", "type": "string"},
       {"name": "monitoring_host", "type": ["null", "string"]},
       {"name": "summary", "type": ["null", "string"]},
       {"name": "message", "type": ["null", "string"]},
       {"name": "tags", "type" : ["null", {"name" : "Tags",
                             
               "type" : "map",
                                            "values" : ["null", "string"]
                                          }]
       }]
}
```
_Snippet: Accepted Avro schema_

The monitoring team will validate the published metric data against the supplied topology and perform a number of dry runs to ensure that there is no issue with the supplied data.  As soon as the metric data is validated by the Monitoring Team these will be the main data to compute A/R and status results. 

### Step 5: Start Monitoring

Once information has been provided, the monitoring of the service starts and the ARGO monitoring Computation and Analytics component calculates availability and reliability of the service, and creates a report. The Infrastructure Manager can have a look at the A/R and status results from the dedicated UI.  Monitoring new services is described in [Use Case 1](case1.md).