---
sidebar_position: 3
title: Downtimes   
---

The term downtime is used to refer to periods when a service is unavailable. Downtime can be caused by failure in hardware (physical equipment), (logic controlling equipment), interconnecting equipment (such as cables, facilities, routers,...), transmission (wireless, microwave, satellite), and/or capacity (system limits).
Apart from a downtime due to an unplanned event there is also downtime as a planned event due to a routing maintenance. 

Scheduling downtime is an effective way to prevent unnecessary or unwanted notifications from being received during a period of expected service interruption.


## How Downtimes are used in the computations 

ARGO Monitoring Service takes into consideration the scheduled downtime to calculate the Reliability of a service or a group of services. It also affects the uptime value. At the same time the Monitoring Service doesn't send unnecessary notifications during periods of expected service interruption.


## How can I define a Downtime

A scheduled downtime is a combination of the endpoint, the service type and the start and end time of the downtime . 

```json
"hostname": "www.grnet.gr",
"service": "WEBSITE",
"start_time": "2021-09-04T00:00:00Z",
"end_time": "2021-09-04T23:59:00Z"
 ```

Monitoring Service has a number of connectors for well-known configuration databases and sources to get the downtimes like:

 - DPMT (Data Project Management Tool, that also manages topology and resources information)
 - GOCDB (Repository for storing and presenting topology and resources information)
 - CSV files (predefined format)
 - Json files (predefined format)
 - xml files (predefined format)
