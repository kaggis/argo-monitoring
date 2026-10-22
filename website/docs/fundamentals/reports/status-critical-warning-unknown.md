---
sidebar_position: 5
title: Status Trends - Critical, Warning,Unknown 
---

## Description 
The ARGO Monitoring Service is checking the services at regular intervals. It actually runs  explicit tests (checks) in order to assess the status of the service. The result of the checks decides on the state of the service. Based on that each service may have a state :

 - **OK**: the check succeeds
 - **CRITICAL**: the check does not  succeed
 - **WARNING**: the check succeeds but  performs unusually
 - **MISSING**: the check’s state is not recorded
 - **UNKNOWN**: the check could not apply on the monitoring item and as a result the check’s state is unknown

As configuration problems, troublesome services, or other service internal problems occur, the checks on the monitoring items can result in a problematic state (critical, warning or unknown state), for a time period.

ARGO Monitoring service analyzes the status timelines in different levels,  detects the CRITICAL, WARNING, UNKNOWN states and  calculates the duration (in minutes) as well as the number of appearances of each state in the daily timelines. ARGO Monitoring service creates a report, for each of the problematic states, with the list of the monitored items which remain in the state for the longest time period.

It actually analyzes the stream of collected status data (monitoring results) using its analytics engine (a big data friendly platform) and traces the problematic states almost in real time, calculating their presence and duration. It uncovers hidden patterns, correlations and other insights and informs the user.


## Examples
State changes can occur due to network problems between monitoring host and monitored item for example:

### Example 1: Counting CRITICAL,WARNING,UNKNOWN status daily appearance and duration
We have a monitoring service that monitors HTTP activity in host2.example.com using the check_http probe. Due to network issues between monitoring box and host2.example.com we have a pattern that some HTTP checks are successful (**OK**) some are critical (**CRITICAL**), some are warning (**WARNING**) and some are unknown (**UNKNOWN**) as shown in picture:
![](/img/reports/status-trends-flapping-img3.png)


#### Result
ARGO Monitoring Service applies calculations on the recorded status timeline and counts the appearance  and duration of CRITICAL, WARNING, UNKNOWN state. 

The duration of the status is calculated by aggregating  the interval duration of each status appearance in the timeline.

In the above example, as the timeline is divided in 20 equal slots, each slot has a duration of  36 minutes.

The ARGO Monitoring Service detects that :

 - WARNING appears 2 times, with duration 72 minutes (2 X 36 minutes)
 - CRITICAL appears 5 times, with duration 180 minutes (5 X 36 minutes)
 - UNKNOWN appears 1 time,, with duration 36 minutes (1 X 36 minutes)

