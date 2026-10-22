---
sidebar_position: 6
title: Recomputations 
---


# Introduction to Recomputation Requests

Recomputations are a vital mechanism for correcting or re-evaluating the status and availability/reliability (a/r) results of the Monitoring Service. They ensure that Monitoring Service's reports reflect accurate conditions, particularly when data is affected by unexpected events or planned interventions. These corrections uphold the principles of fairness, transparency, and accuracy in infrastructure monitoring.

## Why Are Recomputation Requests Needed?

Recomputation requests are typically initiated when:

- **Incorrect service status detections** (false positives) that may distort availability or reliability metrics.
- **Maintenance activities or scheduled downtimes** result in time periods that should not be included in availability or reliability calculations.
- **Metric misconfigurations or data corruption** produce misleading or incorrect service states that need to be ignored or corrected.
- **Audits, post-mortems, or appeals** uncover historical inconsistencies that require manual adjustments for fair reporting.

By defining a time range and the affected elements of the monitoring topology (e.g.,  metrics, endpoints,services,groups), users can request recomputations to adjust the resulting status timelines and availability figures to better reflect reality.

# Types of Recomputation Requests in the Monitoring Service

Recomputation requests vary depending on the kind of correction needed. Each type targets a different aspect of the monitoring topology or behavior, ensuring that only the affected components or timeframes are adjusted.

## 1. Exclude Monitoring Sources

**Purpose**:  
Exclude data originating from a faulty or unreliable monitoring source (e.g., a specific monitoring node or probe) during a defined time window.

**Use Case**:  
In high-availability setups with multiple monitoring sources, one source might temporarily malfunction or produce erroneous results due to network issues, hardware failure, or misconfiguration. By excluding it, users can ensure that bad data does not contaminate service availability calculations.

**Mechanism**:  
You provide the hostname of the monitoring node along with a time range. Data collected by this node during the period is excluded from all aggregation and availability/reliability (a/r) calculations.

**Example Field**:
```json
"exclude_monitoring_source": [
  {
    "host": "monitoring_node01.example.foo",
    "start_time": "2022-01-10T12:00:00Z",
    "end_time": "2022-01-10T23:00:00Z"
  }
]
```

## 2. Exclude Groups

**Purpose**:  
Prevent specific groups (e.g., site, project, or organizational groups) from influencing availability/reliability (a/r) results during a particular recomputation window.

**Use Case**:  
Useful when a whole group of services or endpoints is known to be undergoing maintenance, or when a group’s monitoring data is consistently unreliable for a period. This ensures group-level metrics do not distort higher-level calculations.

**Mechanism**:  
Listed groups are ignored in the calculation of a/r results, although their internal timeline remains unchanged (i.e., statuses are recorded but not considered in report aggregation).

**Example Field**:
```json
"exclude": [ "Group-1", "Group-2" ]
```


## 3. Exclude Metrics

**Purpose**:  
Temporarily ignore one or more specific metrics—optionally scoped to a host, service, or group—during recomputation.

**Use Case**:  
When a particular check (metric) is misbehaving (e.g., wrongly configured thresholds, false alerts), it can negatively affect the status of its corresponding endpoint or service. Excluding such metrics avoids cascading misinterpretation of service health.

**Mechanism**:  
Each excluded metric is specified, and optionally constrained to certain topological scopes (hostname, service, group). The metric’s results are skipped in both timeline processing and a/r calculations.

**Example Field**:
```json
"exclude_metrics": [
  { "metric": "check-1" },
  { "metric": "check-2", "hostname": "host1.example.com" },
  { "metric": "check-3", "group": "Affected-Site" }
]
```


## 4. On-Demand Status Changes of Topology Items

**Purpose**:  
Manually override the computed status of any monitored component (group, service, endpoint, or metric) for a given time range.

**Use Case**:  
Ideal for retrospective adjustments after validation, incident response, or audit. For example, if a downtime was mistakenly reported during a test, users can explicitly mark the component as “OK” or “EXCLUDED” to correct the historical record.

**Mechanism**:  
A set of status overrides is declared, targeting specific topology items and assigning them a forced state (e.g., OK, CRITICAL, EXCLUDED). The system applies these during recomputation in place of the calculated results.

**Example Field**:
```json
  "applied_status_changes": [
    {
      "group": "Group-A",
      "state": "CRITICAL"
    },
    {
      "group": "Group-B",
      "state": "CRITICAL"
    },
    {
      "service": "Service-a",
      "state": "OK"
    },
    {
      "service": "Service-b",
      "state": "OK"
    },
    {
      "service": "Service-c",
      "state": "CRITICAL"
    },
    {
      "service": "Service-d",
      "group": "Group-A",
      "state": "CRITICAL"
    },
    {
      "hostname": "Endpoint-a",
      "state": "OK"
    },
    {
      "hostname": "Endpoint-b",
      "state": "OK"
    },
    {
      "hostname": "Endpoint-c",
      "state": "CRITICAL"
    },
    {
      "hostname": "Endpoint-d",
      "service": "Service-d",
      "group": "Group-A",
      "state": "OK"
    },
    {
      "hostname": "Endpoint-e",
      "service": "Service-d",
      "state": "OK"
    },
    {
      "hostname": "Endpoint-f",
      "group": "Group-A",
      "state": "OK"
    },
    {
      "metric": "Metric-a",
      "state": "EXCLUDED"
    },
    {
      "metric": "Metric-a",
      "service": "Service-a",
      "state": "OK"
    },
    {
      "metric": "Metric-a",
      "hostname": "Endpoint-a",
      "state": "OK"
    },
    {
      "metric": "Metric-b",
      "hostname": "Endpoint-b",
      "service": "Service-b",
      "state": "OK"
    },
    {
      "metric": "Metric-c",
      "hostname": "Endpoint-c",
      "service": "Service-c",
      "group": "Group-A",
      "state": "OK"
    },
    {
      "metric": "Metric-d",
      "service": "Service-d",
      "group": "Group-A",
      "state": "OK"
    },
    {
      "metric": "Metric-e",
      "hostname": "Hostname-e",
      "group": "Group-A",
      "state": "OK"
    }
  ]
```

##  Scope Hierarchy (From Most Granular to Least Granular)

This hierarchy defines how specifically recomputation rules target elements in the monitoring topology. Each level corresponds to a combination of one or more topology elements (`metric`, `endpoint`, `service`, `group`). 

Although users can define the elements in any order, the system always evaluates recomputation rules by increasing scope—from the most specific (with more elements) to the most general (with fewer elements). The more elements defined, the narrower and more targeted the rule's scope.

---

### **Level 1 – Single Element Defined (Most General)**  
A rule defines only **one** topology element.

```json
{ "metric": "Metric-a", "state": "CRITICAL" }
{ "service": "Service-a", "state": "CRITICAL" }

```

### **Level 2 – Two Elements Defined**
The rule specifies two topology elements.

```json
{ "metric": "Metric-a", "endpoint": "Hostname-a", "state": "WARNING" }
{ "metric": "Metric-a", "group": "Group-a", "state": "CRITICAL" }
{ "endpoint": "Hostname-a", "group": "Group-a", "state": "WARNING" }
{ "endpoint": "Hostname-a", "service": "Service-a", "state": "CRITICAL" }
```

### **Level 3 – Three Elements Defined**
The rule includes three topology elements.

```json
{ "metric": "Metric-a", "endpoint": "Hostname-a", "service": "Service-a", "state": "WARNING" }
{ "metric": "Metric-a", "service": "Service-a", "group": "Group-a", "state": "WARNING" }

```

### **Level 4 – Four Elements Defined (Most Specific)**
The rule contains all four topology elements.


```json
{
  "metric": "Metric-a",
  "endpoint": "Hostname-a",
  "service": "Service-a",
  "group": "Group-a",
  "state": "WARNING"
}

```
##  Evaluation and Ordering Logic

- **Within the same scope level**, if multiple recomputation rules refer to the **same topology element(s)**, all are evaluated in the order provided.

- **Across different levels**, recomputations are evaluated **in order of increasing specificity**:

  1. **Level 1** – Least specific
  2. **Level 2**
  3. **Level 3**
  4. **Level 4** – Most specific

This ordering ensures that the system considers broader impact first and then applies more detailed recomputations as necessary.



