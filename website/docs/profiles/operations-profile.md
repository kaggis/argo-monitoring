---
sidebar_position: 1
title: Operations Profile  
---

## Combining timelines

In many cases we need to provide results for top level items that are being monitored. For example if a database service is offered that relies on 2 different hosts, then we need to present a timeline with the status of the service offering itself during the day. To do that we need to combine appropriately the status timelines observed for the  hosts. There many ways to combine them but the usual cases are the following:

- Service is deployed in a high availability fashion among hosts, so we need one of them to be ok for the general service offering to be working. In this case we say that the timelines are combined in an “OR” fashion. E.g. if host1 = OK, host2= CRITICAL the database service will be OK (see figure 1)

- Service is deployed in a distributed fashion among hosts, so all of them are needed to be in a working state so as the service to be considered in working state. In this case we say that the timelines are combined in an “AND” fashion. E.g. if host1 = OK, host2 = CRITICAL the service offered will be CRITICAL (see figure 2)

Figure 1: Service deployed in a high availability fashion
![](/img/profiles/service_example_ha.jpg)

Figure 2: Service deployed in a distributed fashion
![](/img/profiles/service_example_hb.jpg)


## The use of operation profiles

Operations profiles are used in ARGO platform to declare ways in which the status timelines can be combined. Each operation profile is actually a configuration file in json format that consists of the following parts:
- Α section to declare and enumerate all available statuses produced by monitoring checks. ARGO is agnostic on the names and number of statuses that can be produced by monitoring checks and they can be declared here. The default profile includes the usual array of statuses used in most monitoring systems (such as nagios) and that includes the following: OK, WARNING, CRITICAL, UNKNOWN, MISSING and DOWNTIME
- A section to define some default states. For example here we can define that OK state means a working state etc. 
- A section to declare all the available ways (operations) that these statuses can be combined to produce a top result. Here we have a list of operation names mapped to truth tables that contain all the available combinations of statuses and the produced results (see table 1, table 2)

Table 1 - the operations profile for AND operations is given in the following tabular:

| **AND** | **OK** | **WARNING** | **UNKNOWN** | **MISSING** | **CRITICAL** | **DOWNTIME** | 
| --- | --- |   --- | --- |  --- | --- | -- |
| **OK** | OK | WARNING | UNKNOWN | MISSING | CRITICAL | DOWNTIME |
| **WARNING** | WARNING | WARNING | UNKNOWN | MISSING | CRITICAL | DOWNTIME |
| **UNKNOWN** | UNKNOWN | UNKNOWN | UNKNOWN | MISSING | CRITICAL | DOWNTIME |
| **MISSING** | MISSING | MISSING | MISSING | MISSING | CRITICAL | DOWNTIME |
| **CRITICAL** | CRITICAL | CRITICAL | CRITICAL | CRITICAL | CRITICAL | CRITICAL |
| **DOWNTIME** | DOWNTIME | DOWNTIME | DOWNTIME | DOWNTIME |CRITICAL | DOWNTIME |

As can be seen the most prominent status in the case of the “AND” operation is the CRITICAL, while the least prominent is the “OK” status. 

Table 2 - the operations profile for “OR” operations is given in the following tabular:

| **OR** | **OK** | **WARNING** | **UNKNOWN** | **MISSING** | **CRITICAL** | **DOWNTIME** | 
| --- | --- |   --- | --- |  --- | --- | -- |
| **OK** | OK | OK | OK | OK | OK | OK |
| **WARNING** | OK | WARNING | WARNING | WARNING | WARNING | WARNING |
| **UNKNOWN** | OK | WARNING | UNKNOWN | UNKNOWN | CRITICAL | UNKNOWN |
| **MISSING** | OK | WARNING | UNKNOWN | MISSING | CRITICAL | DOWNTIME |
| **CRITICAL** | OK | WARNING | CRITICAL | CRITICAL | CRITICAL |CRITICAL |
| **DOWNTIME** | OK | WARNING | UNKNOWN | DOWNTIME | CRITICAL | DOWNTIME |

In the case of “OR” the most prominent status result is the “OK”. 

## Default operation profile

ARGO provides a default operation profile capable for being used in most monitoring requirements that includes 6 monitoring states: OK, WARNING, CRITICAL, UNKNOWN, MISSING, DOWNTIME and two available operations on combining them: OR and AND 

Below is the default operation profile used in JSON Format:

```json
{
            "id": "profile_uuid",
            "date": "2015-01-01",
            "name": "profile_name",
            "available_states": [
                "OK",
                "WARNING",
                "UNKNOWN",
                "MISSING",
                "CRITICAL",
                "DOWNTIME"
            ],
            "defaults": {
                "down": "DOWNTIME",
                "missing": "MISSING",
                "unknown": "UNKNOWN"
            },
            "operations": [
                {
                    "name": "AND",
                    "truth_table": [
                        {
                            "a": "OK",
                            "b": "OK",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "WARNING",
                            "x": "WARNING"
                        },
                        {
                            "a": "OK",
                            "b": "UNKNOWN",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "OK",
                            "b": "MISSING",
                            "x": "MISSING"
                        },
                        {
                            "a": "OK",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "OK",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        },
                        {
                            "a": "WARNING",
                            "b": "WARNING",
                            "x": "WARNING"
                        },
                        {
                            "a": "WARNING",
                            "b": "UNKNOWN",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "WARNING",
                            "b": "MISSING",
                            "x": "MISSING"
                        },
                        {
                            "a": "WARNING",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "WARNING",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "UNKNOWN",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "MISSING",
                            "x": "MISSING"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        },
                        {
                            "a": "MISSING",
                            "b": "MISSING",
                            "x": "MISSING"
                        },
                        {
                            "a": "MISSING",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "MISSING",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        },
                        {
                            "a": "CRITICAL",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "CRITICAL",
                            "b": "DOWNTIME",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "DOWNTIME",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        }
                    ]
                },
                {
                    "name": "OR",
                    "truth_table": [
                        {
                            "a": "OK",
                            "b": "OK",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "WARNING",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "UNKNOWN",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "MISSING",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "CRITICAL",
                            "x": "OK"
                        },
                        {
                            "a": "OK",
                            "b": "DOWNTIME",
                            "x": "OK"
                        },
                        {
                            "a": "WARNING",
                            "b": "WARNING",
                            "x": "WARNING"
                        },
                        {
                            "a": "WARNING",
                            "b": "UNKNOWN",
                            "x": "WARNING"
                        },
                        {
                            "a": "WARNING",
                            "b": "MISSING",
                            "x": "WARNING"
                        },
                        {
                            "a": "WARNING",
                            "b": "CRITICAL",
                            "x": "WARNING"
                        },
                        {
                            "a": "WARNING",
                            "b": "DOWNTIME",
                            "x": "WARNING"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "UNKNOWN",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "MISSING",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "UNKNOWN",
                            "b": "DOWNTIME",
                            "x": "UNKNOWN"
                        },
                        {
                            "a": "MISSING",
                            "b": "MISSING",
                            "x": "MISSING"
                        },
                        {
                            "a": "MISSING",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "MISSING",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        },
                        {
                            "a": "CRITICAL",
                            "b": "CRITICAL",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "CRITICAL",
                            "b": "DOWNTIME",
                            "x": "CRITICAL"
                        },
                        {
                            "a": "DOWNTIME",
                            "b": "DOWNTIME",
                            "x": "DOWNTIME"
                        }
                    ]
                }
            ]
        }
```

 ## Technical part
 
The connection of the Operations profiles with the other components of ARGO

They are:

 - defined in POEM
 - stored in ARGO Web API
 - Used for the computations in the Analytics Engine

