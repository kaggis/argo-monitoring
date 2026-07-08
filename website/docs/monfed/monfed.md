---
sidebar_position: 1
title: Guide
description: Common definitions for availability, reliability, and uptime across federated Nodes, with the API that publishes them.
---


## **Purpose**

This document establishes a common frame of reference for how monitoring metrics are computed and published across federated Nodes. Its aim is to ensure that availability, reliability, and related figures carry the same meaning regardless of which Node produces them, so that published results can be compared, aggregated, and trusted rather than merely coexisting.

These metrics are not measured directly. They are derived from the amount of time a service spends in each defined state, and that state is itself determined by the checks run against the service: the probe results place the service in OK, WARNING, CRITICAL, or another state at any given moment. Two Nodes can apply the same definitions and still report different numbers if they disagree on how probe results map to states, or on which states count as the service being "up." This specification therefore fixes the set of states, how they group together, and how a state is derived from probe results — all of which every Node must adopt before any figure is produced. Agreement on measurement must precede agreement on the numbers.

## **Checks and statuses**

A check (or probe) is a program that runs on a schedule, tests a specific aspect of a service, and reports back. Each execution produces two things: a status describing what it found, and a timestamp recording when the check ran.

Each check is scheduled to run at a specific interval. A lightweight probe (for example, "is the endpoint responding?") might run every few minutes, while a heavier or more intrusive test (a full functional check, or a certificate or authentication test) might run every 15, 30, or 60 minutes.

At a minimal configuration, a set of possible status values is the following:

* **OK**: the service is working.  
* **WARNING**: the service is working, but with warnings. For availability purposes, WARNING is treated as good as OK.  
* **CRITICAL**: the service is not working.  
* **UNKNOWN**: the status cannot be computed because the underlying tests returned UNKNOWN.  
* **MISSING**: the status cannot be computed because tests could not run, or the validity period of the last test expired.

Different monitoring stacks may label these differently (Healthy for OK, Degraded for WARNING, and so on). What matters is that each stack maps its own status values onto this set, so that every Node agrees on which statuses count as up, down, or unknown.

**Scheduled downtime** is a separate condition, not a status. A service may be *declared* to be in scheduled downtime (maintenance) for a defined period, independently of what its probes report. In the usual model this declaration takes precedence: while a service is in scheduled downtime, that time is treated as maintenance regardless of the underlying status. The Uptime figure below revisits exactly this point.

## **From results to timelines**

As checks run and their statuses change, they build a continuous timeline for each service: an ordered record of which state it was in, and for how long (timeseries). 

This timeline is the raw material for every figure. Availability, reliability, and the rest are not computed from individual check results but from how much time the service spent in each state. Once the timeline is built, the figures follow directly from how much time was spent up, down, unknown, or in maintenance, which is why agreeing on how statuses become states, and how states become timelines, has to come first.

If two Nodes disagree on what counts as "up," they will report different numbers for identical behaviour. The most common trap concerns WARNING: **a warning usually counts as up.** A Node that instead treats WARNING as degraded will under-report availability for a service that behaved exactly the same.

## **What counts as up, down, or unknown**

Before any figure can be produced, every Node has to group the statuses the same way:

* **Up** — OK or WARNING. A warning still counts as up.  
* **Down** — CRITICAL.  
* **Unknown** — UNKNOWN or MISSING: time we simply could not judge.  
* **Scheduled downtime** — a declared window, independent of what the probes report.

Time under which the status could not be measured is considered unknown and is never counted for or against a service. It is set aside, so that every figure reflects only the time that the monitoring system had a clear picture regarding the service it monitors.

## **The published figures**

Three figures are published. Each answers a version of the same question: *what share of the time was the service up?*, and they differ only in how they treat scheduled maintenance.

**Availability:** This metric measures the service’s success against the entire timeline. It is calculated by taking the total time the service was functional and dividing it by the total known time, including scheduled maintenance. Because all planned maintenance is categorized as downtime, this metric penalizes the service for any period it is taken offline, even when the work is deliberate and successful.

**Reliability:** This metric measures the service’s performance strictly during its intended operational window. It is calculated by taking the total time the service was functional and dividing it by the total known time, minus any scheduled maintenance windows. By completely setting aside planned work, this metric reflects only how the service performed when it was expected to be available, ensuring maintenance neither helps nor hurts the final score.

**Uptime:** This metric measures the service’s actual responsiveness, regardless of maintenance status. It is calculated by taking the total time the service was functional and dividing it by all time that could be measured (excluding only periods where no data was available). Because this metric credits a service for staying functional during a maintenance window but penalizes it for any actual failure during that same period, it functions as a performance-only measure that will always be equal to or higher than Availability.

Any of these figures is undefined for a period in which there was nothing to judge — for Availability and Uptime, when the whole period was unmeasurable; for Reliability, when the whole period was either unmeasurable or under maintenance.

## **Monitoring Federation Capability API Spec**  

Explore the specification [here](pathname:///openapi/explore.html).

### **How the endpoints are organised**

The API has five resource families. Each one offers the same two routes: a list route that covers every item (optionally filtered), and a single-item route that targets one item by name. All are GET.

#### **Summary:** a quick call perfect for dashboards to quickly get a summary of the current status of the service

  - GET all: `/monitoring/summary`
  - GET specific : `/monitoring/summary/{service-name}`

  Returns: current status, current metrics, and any active/recent downtimes and issues, per item

#### **Metrics:** the availability and uptime numbers.  
    
  - GET all: `/monitoring/metrics`
  - GET specific: `/monitoring/metrics/{service-name}`

  Returns: dated results, each with availability and uptime as percentages (0–100)


#### **Status:** the state of a service over time.  
    
  - GET all: `/monitoring/status`
  - GET specific: `/monitoring/status/{service-name}`

    
  Returns: An timeseries array with the status changes of the service at specific points in time  
    
#### **Downtimes**: declared maintenance windows.  
    
  - GET all: `/monitoring/downtimes`
  - GET specific: `/monitoring/downtimes/{service-name}`

  Returns: An array of scheduled maintenance windows with name, description, start-time, end-time  
    
#### **Issues:** Details on specific monitoring issues:  
  
  - GET all: `/monitoring/issues`
  - GET specific: `/monitoring/issues/{service-name}`  
  
  Returns: Array of monitoring issue items with timestamp, host, source, message


  
