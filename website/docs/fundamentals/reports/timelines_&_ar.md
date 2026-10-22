---
sidebar_position: 1
title: Status Timelines & A/R Results 
---

## Description 

The ARGO Monitoring Service is checking the services at regular intervals. It actually runs  explicit tests (checks) in order to assess the status of the service. The result of the checks decides on the state of the service. 
Based on that each service may have a state :

 - **OK**: the check succeeds
 - **CRITICAL**: the check does not  succeed
 - **WARNING**: the check succeeds but  performs unusually
 - **MISSING**: the check’s state is not recorded
 - **UNKNOWN**: the check could not apply on the monitoring item and as a result the check’s state is unknown
 
As configuration problems, troublesome services, or other service internal problems occur, the checks on the monitoring items can result in a problematic state (critical, warning or unknown state), for a time period. 

The monitored item is part of a multi-level hierarchy, a.k.a topology. A topology is organized as following:  
```
|--group         
     |--service
         |--endpoint
	          |--metric
```
The results of these daily checks a.k.a Metric Data, are ingested and stored in HDFS. Each Metric Data record includes information about the timestamp and the status of the monitored metric check,  also information about the topology  and some extra information regarding the check .

An example metric result in is shown below:
```json
{
  "timestamp": "2021-05-02T10:53:38Z",
  "metric": "http.check",
  "service_type": "Web-Site",
  "hostname": "host1.example.com",
  "status": "OK"
  "summary":""
  "description": ""
}
```
ARGO Monitoring service using its analytics engine (a big data friendly platform), analyzes the stream of collected Metric Data, and is able to apply calculations on all the levels of the topology. It provides timeline results and availability/reliability results of the monitored item or a group of monitored items. 
