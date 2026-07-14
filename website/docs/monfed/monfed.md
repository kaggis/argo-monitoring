---
sidebar_position: 1
title: Guide
description: Common definitions for availability, reliability, and uptime across federated Nodes, with the API that publishes them.
---

## Purpose

This document establishes a common frame of reference for how monitoring metrics are computed and published across federated Nodes. Its aim is to ensure that **monitoring metrics such as availability, reliability, uptime and related figures carry the same meaning regardless of which Node produces them**, so that published results can be compared, aggregated, and trusted rather than merely coexisting.

To ensure consistency across the federation, this specification standardizes how metrics are derived. Because metrics like "uptime" are not measured directly, they must be calculated based on the service's state (e.g., OK, WARNING, CRITICAL) over time. If two Nodes define these states differently, or disagree on which states constitute "up," their final reports will inevitably conflict even if their raw data is identical. This document eliminates such discrepancies by mandating a unified method for mapping check results to states, ensuring that every Node calculates its final figures using the exact same logic. Agreement on measurement must precede agreement on the numbers.

## Checks and statuses

A check is a program that runs on a schedule, tests a specific aspect of a service, and reports back. Each execution produces two things: a status describing what it found, and a timestamp recording when the check ran.

Each check is scheduled to run at a specific interval. A lightweight probe (for example, "is the endpoint responding?") might run every few minutes, while a heavier or more intrusive test (a full functional check, or a certificate or authentication test) might run every 15, 30, or 60 minutes.

At a minimal configuration, a set of possible status values is the following:

* **OK**: the service is working.  
* **WARNING**: the service is working, but with warnings. For availability purposes, WARNING is treated as good as OK.  
* **CRITICAL**: the service is not working.  
* **UNKNOWN**: the status cannot be computed because the underlying tests returned UNKNOWN.  
* **MISSING**: the status cannot be computed because tests could not run, or the validity period of the last test expired.

Different monitoring stacks may label these differently (Healthy for OK, Degraded for WARNING, and so on). What matters is that each stack maps its own status values onto this set, so that every Node agrees on which statuses count as up, down, or unknown.

**Scheduled downtime** is a separate condition, not a status. A service may be *declared* to be in scheduled downtime (maintenance) for a defined period, independently of what its probes report. In the usual model this declaration takes precedence: while a service is in scheduled downtime, that time is treated as maintenance regardless of the underlying status. The Uptime figure below revisits exactly this point.

## From results to timelines

Monitoring checks produce a chronological time-series for each service, tracking state transitions and the duration of each status over time.

This status timeline is the foundation which helps us calculate monitoring metrics such as: Availability, reliability, uptime etc. These metrics are not computed from individual check results but instead by calculating how much time the service has spent in each state. Once the timeline is built, the figures follow directly from how much time was spent up, down, unknown, or in maintenance, which is why agreeing on how statuses become states, and how states become timelines, has to come first.

If two Nodes disagree on what counts as "up," they will report different numbers for identical behaviour. The most common trap concerns WARNING: **a warning usually counts as up.** A Node that instead treats WARNING as degraded will under-report availability for a service that behaved exactly the same.

## What counts as up, down, or unknown

Before any figure can be produced, every Node has to group the statuses the same way:

* **Up** — `OK` or `WARNING`. A warning still counts as up.  
* **Down** — `CRITICAL`.  
* **Unknown** — `UNKNOWN` or `MISSING`: time we simply could not judge.  
* **Scheduled downtime** — a declared window, independent of what the probes report.

Time under which the status could not be measured is considered unknown and is never counted for or against a service. It is set aside, so that every figure reflects only the time that the monitoring system had a clear picture regarding the service it monitors.

## Monitoring metrics

Here we describe a common set of monitoring metrics: Availability, Reliability and Uptime. Each answers a version of the same question: *what share of the time was the service up?*, and they differ only in how they treat scheduled maintenance.

**Availability:** This metric measures the service’s success against the entire timeline. It is calculated by taking the total time the service was functional and dividing it by the total known time, including scheduled maintenance. Because all planned maintenance is categorized as downtime, this metric **penalizes** the service for any period it is taken offline, even when the work is deliberate and successful.

**Reliability:** This metric measures the service’s performance strictly during its intended operational window. It is calculated by taking the total time the service was functional and dividing it by the total known time, minus any scheduled maintenance windows. By completely setting aside planned work, this metric reflects only how the service performed when it was **expected** to be available, ensuring maintenance neither helps nor hurts the final score.

**Uptime:** This metric measures the service’s actual responsiveness, regardless of maintenance status. It is calculated by taking the total time the service was functional and dividing it by all time that could be measured (excluding only periods where no data was available). Because this metric credits a service for staying functional during a maintenance window but penalizes it for any actual failure during that same period, it functions as a performance-only measure that will always be equal to or higher than Availability.

**Note:** These metrics are only applicable for periods where we have concrete, known monitoring data available.

**Note:** Further metrics regarding service performance will be included in subsequent milestones

## Monitoring Federation Capability API Spec  

You can explore the api specification [[here](pathname:///openapi/explore.html).

The API calls are organised in the following groups: 

### Summary 
A quick call perfect for dashboards to quickly get a summary of the current status of the service

- GET all: `/monitoring/summary`  
- GET specific : `/monitoring/summary/{service-id}`

**Returns**: current status, current metrics, and any active/recent downtimes and issues, per item.

for example:

```
{
  "data": [
    {
      "id": "argo-msg
      "name": "argo-messaging",
      "status": "CRITICAL",
      "metrics": {
        "availability": 97.2,
        "reliability": 97.2,
        "uptime": 97.2
      },
      "downtimes": [],
      "issues": [
        {
          "timestamp": "2026-07-02T09:10:00Z",
          "host": "argo-msg-mq-01",
          "source": "message-queue",
          "message": "Consumer lag exceeded 5000 messages"
        }
      ]
    }
  ],
  "page": {
    "limit": 50,
    "offset": 0,
    "total": 2
  }
}
```



### Metrics
Get daily or monthly results for monitoring metrics such as Availability, Uptime, etc.  
    
-  GET all: `/monitoring/metrics`  
-  GET specific: `/monitoring/metrics/{service-id}`

**Returns**: a list of services or a specific service and for each one an array of results (daily or monthly) with availability and uptime numbers.

for example:

```
{
  "data": [
    {
      "id": "argo-mon",
      "name": "argo-monitoring",
      "results": [
        {
          "date": "2026-07-02",
          "availability": 97.5,
          "reliability": 100,
          "uptime": 97.5
        }
      ]
    },
    {
      "id": "argo-msg",
      "name": "argo-messaging",
      "results": [
        {
          "date": "2026-07-02",
          "availability": 100,
          "reliability": 100,
          "uptime": 100
        }
      ]
    }
  ],
  "page": {
    "limit": 50,
    "offset": 0,
    "total": 2
  }
}

```
  

### Status
Get the state of a service over time.  
    
- GET all: `/monitoring/status`  
- GET specific: `/monitoring/status/{service-id}`  
    
**Returns**: A timeseries array with the status changes of the service at specific points in time.

for example:
```
{
  "data": [
    {
      "id": "argo-mon",
      "name": "argo-monitoring",
      "results": [
        {
          "timestamp": "2026-07-02T00:00:00Z",
          "state": "WARNING"
        },
        {
          "timestamp": "2026-07-02T06:49:32Z",
          "state": "OK"
        }
      ]
    },
    {
      "id": "argo-msg",
      "name": "argo-messaging",
      "results": [
        {
          "timestamp": "2026-07-02T00:00:00Z",
          "state": "OK"
        },
        {
          "timestamp": "2026-07-02T06:49:32Z",
          "state": "OK"
        }
      ]
    }
  ],
  "page": {
    "limit": 50,
    "offset": 0,
    "total": 2
  }
}
```
  

## Downtimes
Get declared maintenance windows.  
    
- GET all: `/monitoring/downtimes`  
- GET specific: `/monitoring/downtimes/{service-id}`

**Returns**: An array of scheduled maintenance windows with name, description, start-time, end-time.

for example:

```
{
  "data": [
    {
      "id": "argo-mon",
      "name": "argo-monitoring",
      "results": [
        {
          "name": "Scheduled maintenance",
          "description": "Database upgrade window",
          "start-time": "2026-07-28T02:00:00Z",
          "end-time": "2026-07-28T04:00:00Z"
        }
      ]
    }
  ],
  "page": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```


  

## Issues
Get details on specific monitoring issues:  
- GET all: `/monitoring/issues`  
- GET specific: `/monitoring/issues/{service-id}`  

**Returns**: An array of detailed objects regarding checks that identified problematic states. Each item provides the timestamp of the check, the severity status (e.g., CRITICAL or WARNING), the target host, and the specific service instance (source) that was evaluated. Additionally, each object includes a detailed log message generated by the check.

for example:

```
{
  "data": [
    {
      "id": "argo-mon",
      "name": "argo-monitoring",
      "results": [
        {
          "timestamp": "2026-07-01T14:22:10Z",
          "status": "CRITICAL",
          "host": "argo-mon-api-03",
          "source": "argo-mon-api",
          "message": "certificate expired - could not connect"
        }
      ]
    }
  ],
  "page": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```