---
sidebar_position: 3
title: Threshold Profile  
---

## Description 

The ARGO Monitoring Service is generating Status and A/R reports based on the metric results that it gathers from the execution of the monitoring probes. Each metric result includes a status and performance data that typically contain values related to the provided status. Currently the ARGO Monitoring Service relies solely on the statuses returned by the probes in order to generate the Status and A/R reports. 

Each probe has a hard-coded built-in static logic in order to compute the probe status. Although this have been proven sufficient for the purposes of infrastructure monitoring up to now, it does not give us any flexibility in providing different 	SLA targets customers. 

**For example,** let’s say that a probe check the average response time of the tickets in helpdesk system. 
_With the current implementation_, the acceptable response time is part of the probe configuration. 
If we want to have _different acceptable response time for a specific customer_, then we will have to create a new probe configuration and execute a new test. 

So in order to have **different acceptable response time for each customer**, we have to easily define these hardcoded values and use them as parameters. So actually we have to  move the metric status computation to something more dynamic like the ARGO analytics engine. So the monitoring probes executed will return the actual data (e.g. the average response time) and then on the ARGO Analytics Engine we can have use multiple threshold profiles, which will be used in order to generate reports based on the customer needs.
 

## Example 

Let's take the check_ping as an example which returns the packet loss and lets assume that it has been enhanced to return average round trip time as a response. Sample output from the metric check might look like this:

PING ok - Packet loss = 0%,  response=0.80 | response=20ms;0;300;299;1000

This is the default result of the metric. 

In our example we have 2 hosts

 - webserver01.example.com
 - webserver02.example.com

The SLA defines a different response times for each of them. In order to achieve that we have to define 2 different thresholds one for each host.

The way to define the thresholds follow the following format. 
```
'label'=value[UOM];[warn];[crit];[min];[max]
```

where

```
label : can contain alphanumeric characters but must always begin with a letter
value : is a float or integer
uom : is a string unit of measurement (accepted values: s,us,ms,B,KB,MB,TB,%,c)
warning: is a range defining the warning threshold limits
critical: is a range defining the critical threshold limits
```

So based on the SLA we define the following 2 thresholds 

```
host: webserver01.example.com
thresholds: response=20ms;0:200;199:300

host: webserver02.example.com
thresholds: response=20ms;0:500;499:1000
```

BY using the threshold profiles, we managed to have different  Warning and Critical limits for webserver01.example.com and webserver02.example.com and we support them for their SLA. 

### Technical part


The connection of the Threshold profiles with the other components of ARGO 

They are:
 - defined in POEM 
 - stored in ARGO Web API 
 - part of a report and the correlation is also configured in POEM  
 - Used for the computations in the Analytics Engine 
 - Presented in the ARGO Web UI.

