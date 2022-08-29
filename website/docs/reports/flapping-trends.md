---
sidebar_position: 4
title: Status Trends - Flapping 
---

## Description 
Flapping occurs when a service or host changes state too frequently, resulting in a storm of problems and recovery notifications. Flapping can be indicative of configuration problems (i.e.  wrong configuration between the monitored item and the monitoring host), troublesome services, or real network problems. This causes a lot of alarms and notifications. 

ARGO Monitoring service analyzes the status timelines in different levels, detects the flapping patterns and creates a report with the list of the most problematic monitored items.  It actually analyzes the stream of collected status data (monitoring results) in a big data friendly platform (analytics engine)  and traces flapping patterns almost immediately. It uncovers hidden patterns, correlations and other insights and informs the user.

## Examples
Flapping can occur due to network problems between monitoring host and monitored item for example:
![](/img/reports/status-trends-flapping-img1.png)

### Example 1: Flapping due to network issue
ARGO Monitoring service monitors HTTP activity in host1.example.com using the check_http check. Due to network issues between the ARGO Monitoring service and host1.example.com a pattern arises that some http checks are successful (OK) and some are critical (CRITICAL) (in successive order) as shown in picture:

#### Result
Based on this behaviour, during the data computations, the service is flagged as a flapping service, and it is included in the list of flapping services presented in the ARGO Monitoring UI. 

### Example 2: Flapping due to internal problem of the service 
ARGO Monitoring service monitors the file upload functionality in host2.example.com (object storage) using the file upload check. Due to an internal error of the service, the check uploads a file successfully (OK), then issues a deletion request on it but the deletion takes too long. In a second attempt to re-upload the file the check receives a warning (WARNING) until the deletion of the original is completed. This results in a repeating pattern of status being OK then WARNING, then again OK etc as shown in the following picture:
![](/img/reports/status-trends-flapping-img2.png)

#### Result
Based on this behaviour, during the data computations, the service is flagged as a flapping service, and it is included in the list of flapping services presented in the ARGO Monitoring UI. 
