---
title: "Conf Reports"
sidebar_position: 5
---

The **Conf Reports** page provides an overview of the reports configured for a tenant. It allows users to view the configuration that defines how monitoring data is collected, grouped, processed, and used to calculate availability and reliability results.

For each tenant, the page displays the available reports and the configuration associated with the selected report.

### **Available Reports**

The **Available Reports** panel lists the reports configured for the tenant. Each report shows its name, report type, and visibility. A report can be marked as **Public**, indicating that it can be made available through the tenant's public reporting pages.

When a report is selected, its configuration is displayed in the main area of the page.

### **Report Information**

The selected report displays general information such as:

* **Status** — indicates whether the report is currently active.  
* **Report ID** — the unique identifier of the report.  
* **Created** — the date and time when the report was created.  
* **Last Updated** — the date and time when the report configuration was last modified.  
* **Visibility** — indicates whether the report is public or private.

The report visibility can be changed using the **Make private** or corresponding visibility action.

| This action can be performed by both Super and Tenant Administrators and any user with access to a Tenant in Argo Monitoring Service, assigned with a role that is allowed to perform this action. .  |
| :---- |

### **Metric Profile**

The **Metric Profile** section shows the metrics included in the selected report. Metrics are organized by service or metric group, making it possible to see which monitoring metrics contribute to the report.

The **Expand All** option can be used to display the metrics contained within each group.

### **Profiles**

The **Profiles** section displays the profiles used by the report configuration. These may include:

* **Aggregation** — defines how monitoring results are aggregated.  
* **Operations** — defines the operations or processing rules applied to the monitoring data.

These profiles determine how the collected monitoring information is processed before the report results are produced.

### **Topology Schema**

The **Topology Schema** defines how monitored resources are organized within the report.

It specifies the hierarchy used to group monitoring results. In the example shown, the report uses:

* **Group:** `PROJECT`  
* **Subgroup:** `SERVICEGROUPS`

This structure determines how services and their monitoring results are associated and presented within the report.

### **Computations**

The **Computations** section shows which calculations are enabled for the report. These computations determine which monitoring characteristics are derived from the collected data.

Examples shown in the configuration include:

* **Availability & Reliability**  
* **Status**  
* **Flapping**  
* **Tags**

Each computation is marked as **Enabled** when it is active for the report.

### **Thresholds**

The **Thresholds** section displays the values used by the report when evaluating monitoring results.

The configured thresholds may include:

* **Availability** — minimum availability percentage.  
* **Reliability** — minimum reliability percentage.  
* **Uptime** — threshold used when evaluating uptime.  
* **Unknown** — threshold associated with unknown monitoring states.  
* **Downtime** — threshold associated with downtime.

These thresholds are part of the report configuration and are used when calculating and interpreting the corresponding monitoring results.

## Core Concepts

Monitoring a large and distributed infrastructure requires more than simply collecting monitoring results. Different tenants may need to monitor different services, use different metrics, organize their resources in different ways, and apply specific rules when calculating availability and reliability.

**Configuration Reports (Conf Reports)** provide a centralized view of the configuration that determines how monitoring data is transformed into meaningful report results. They allow users to understand how a tenant's monitoring information is structured and how the resulting metrics and status information are calculated.

### Why Configurations Reports are required?

Conf Reports are useful for: 
- **Understanding report configuration** — provides visibility into the metrics, profiles, topology, computations, and thresholds used by a report. 
- **Ensuring consistent reporting** — defines the rules used to process monitoring results and calculate indicators such as availability and reliability. 
- **Understanding how services are grouped** — shows the topology structure used to organize monitored services and their results. 
- **Verifying monitoring calculations** — allows users to check which computations are enabled and which thresholds are applied. 
- **Supporting troubleshooting and validation** — helps identify configuration differences or unexpected settings that may affect reported monitoring results. 
- **Managing report visibility** — shows whether a report is public or private and allows its visibility to be controlled. 

In this way, **Conf Reports act as the configuration reference behind a tenant's monitoring reports**, helping users understand not only *what* results are produced, but also *how those results are derived*.  
