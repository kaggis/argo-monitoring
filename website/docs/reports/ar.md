---
sidebar_position: 3
title: A/R results 
---
## Availability Reliability 
ARGO Monitoring service, by  generating status timelines for each level of the topology,  can produce useful conclusions about the monitoring item. One very useful conclusion is to decide if the item is available for usage and if it is considered as reliable.   
To succeed this,  availability/reliability rates need to be calculated on the timelines. 

### Availability 

Availability: Service Availability is the fraction of time a service was in the UP Period during the known interval in a given period.

Availability rate is useful to know, as it provides information of the time the monitored item is available for use. Availability is calculated as follows:

```
Availability = UP period / KNOWN period 
```

where 

```
KNOWN = Total period / UNKNOWN period 
```
and

 - **UP** period : The duration  the status of the monitored item is OK or WARNING
 - **UNKNOWN** period: The duration  the status of the monitored item is UNKNOWN
 - **Total** period : The duration  of the monitoring (usually a day)

### Reliability  

Reliability : Service Reliability is the ratio of the time interval a service was UP over the time interval it was supposed (scheduled) to be UP in the given period.

Reliability rate is also useful to know, as it provides information about the quality of monitored item during the monitoring time, whereas it is reliable of usage or not. 

Reliability is calculated as follows:
 
```
Reliability = UP period / (KNOWN period – Scheduled Downtime) 
```

where 

 - **UP** period : The duration  the status of the monitored item is OK or WARNING
 - **UNKNOWN** period: The duration the status of the monitored item is UNKNOWN
 - **Scheduled** Downtime period: The duration  the status of the monitored item is defined to be DOWNTIME
 - **Total** period : The duration of the monitoring (usually a day)



### Example

Let’s assume we have a timeline for 15-09-2021 with the following status/timestamp

![](/img/reports/ARtimeline.png) 

timestamp  | status
------------- | -------------
2021-09-15T00:00:00Z  | OK
2021-09-15T03:00:00Z  | CRITICAL
2021-09-15T12:00:00Z  | UNKNOWN
2021-09-15T18:00:00Z | DOWNTIME
2021-09-15T22:00:00Z  | OK

Based on these timestamps each status lasts as: 

 - **OK Status:**         From 00:00 to 03:00 and from 22:00 till the end of the day
 - **CRITICAL  Status:**  From 03:00 to 12:00
 - **UNKNOWN  Status:**   From 12:00 to 18:00

The Service owner has informed the monitoring service for a scheduled downtime from 18:00 to 22:00 

Calculating the duration for each status in seconds is: 

Status      | Duration
------------- | -------------
**Total seconds of a day** | 86400 seconds /24h
**OK** | 18000 seconds /5h
**CRITICAL** | 32400 seconds /9h 
**UNKNOWN** | 21600 seconds /6h
**DOWNTIME** | 14400 seconds /4h

```
Availability = UP period / KNOWN period = UP period / (Total period – UNKNOWN period)
```
where:

 - **UP** period =OK period + WARNING period=18000 seconds 
 - **UNKNOWN** period: UNKNOWN period + MISSING period=21600 seconds 
 - **Total** period : 86400  seconds
 - **Availability** = 18000/(86400-21600)=0.2777, and converting to the scale of 100 the availability is 27.777



```
Reliability = UP period / (KNOWN period – Scheduled Downtime) = UP period / (Total     period – UNKNOWN period – ScheduledDowntime)
```

where:

 - **UP** period =OK period +WARNING period. This in numbers means 18000 seconds 
 - **UNKNOWN** period: UNKNOWN period+MISSING period. This in numbers means 21600 seconds
 - **ScheduledDowntime** period: 14400 seconds
 - **Total** period : 86400 seconds
 - **Reliability** =18000/(86400-21600-14400)=0.3571, and converting to the scale of 100 the reliability is 35.771

 
ARGO Monitoring Service also calculates results of up period, downtime period, unknown period as:

- **UP** = UP period / Total period.  This in numbers mean 18000/86400 =0.20833 
- **UNKNOWN**=UNKNOWN period +MISSING period / Total period. | this in numbers mean  21600/86400=0.25 
- **DOWNTIME**= DOWNTIME period / Total period.  This in numbers mean  14400/86400=0.16667





