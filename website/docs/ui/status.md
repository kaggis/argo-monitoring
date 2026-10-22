---
title: "Status"
sidebar_position: 26
---


The availability of a service is determined not only by whether it can be reached, but also by the results reported by the monitoring checks that evaluate its operation. A service may be available while individual monitoring checks report different conditions, or it may become unavailable due to a problem detected by one or more checks. **Status monitoring provides a clear indication of the current condition of a monitored service and helps identify when and where a problem occurs.**

ARGO Monitoring Service continuously collects the results reported by monitoring metrics and uses them to determine the status of the monitored resources. Status information can be provided for different levels of the monitoring structure, including **groups, services, endpoints, and individual monitoring metrics**, allowing the condition of a service to be understood at both a high level and in greater detail.

While availability and reliability measurements provide information about **whether a service is available and how reliably it operates over time**, status monitoring addresses a more immediate question: **“What is the current condition of the service, and what is causing that condition?”**

The status of a monitored resource is derived from the **actual results reported by its monitoring metrics**. These results indicate the condition detected by each monitoring check and are used to determine the status of the corresponding endpoint, service, or group according to the monitoring configuration. As a result, the status provides a consolidated view of the information collected from the underlying monitoring checks.

Status information also makes it possible to **follow a problem through the monitoring hierarchy**. For example, a service may report a problematic status because one of its endpoints is affected, while the endpoint status may in turn be caused by a specific monitoring metric reporting a failure. This allows users to move from the overall service condition to the underlying monitoring result that is responsible for it.

Status can change as new monitoring results are received. These changes provide an indication of how the condition of a service evolves, for example when a service moves from a normal state to a problematic state and later returns to normal operation. The sequence of these changes can be used to understand the behaviour of a service and, together with **Status Timelines**, provide a historical view of its condition over time.

It is important to note that **status is determined by the monitoring results and the monitoring configuration**. Different metrics may evaluate different aspects of a service, and their results may therefore contribute differently to the resulting status. This allows the status presented by ARGO Monitoring Service to reflect the aspects of service operation that are relevant to the monitoring configuration.

By providing status information at multiple levels of the monitoring hierarchy, ARGO Monitoring Service gives users both a **high-level view of service condition and the ability to investigate the underlying monitoring results**. This makes status a central part of monitoring, helping users quickly identify problematic services and understand where further investigation is required.

## Core Concepts

### Why Use Status? 

1) **Get an immediate view of service condition** — status provides a clear indication of whether a monitored service is operating normally or whether a problem has been detected. 
2) **Identify problems quickly** — changes in status make it possible to quickly recognize when a service, endpoint, or monitoring check is no longer operating as expected. 
3) **Understand where a problem occurs** — status is available at different levels of the monitoring hierarchy, allowing users to move from a service or group status to the affected endpoint and, ultimately, to the monitoring metric responsible for the problem.
4) **Support faster troubleshooting** — by connecting the overall service condition with the results of individual monitoring checks, status helps users identify the source of an issue and determine where further investigation is required.
5) **Monitor changes in service condition** — status changes show how a service condition evolves as new monitoring results are received, including transitions from normal operation to a problematic state and back to normal. Provide a consolidated view of monitoring results — status combines information from the underlying monitoring metrics according to the monitoring configuration, giving users a simplified view of the overall condition of the monitored resource.
6) **Complement availability and reliability information** — while availability and reliability describe service operation over time, status provides an immediate view of the current condition and the monitoring results that led to it. 

## View in the UI 

The Status page provides a timeline view of the status of the services/groups for the selected tenant. It allows users to monitor the availability and status of each group over a specific period.

Each status timeline can display the following status types:

* **OK** – The service or group is operating normally.  
* **Warning** – The service or group is experiencing a warning condition.  
* **Critical** – The service or group is experiencing a critical issue.  
* **Downtime** – The service or group is unavailable.  
* **Unknown** – The status of the service or group cannot be determined.  
* **No data** – No status data is available for the selected period.

**Status timeline**

The Status page displays all available groups for the selected tenant as individual timelines.

For each group, the following information is displayed:

* **Name** of the group  
* **Current status**, indicated by the colored status indicator next to the group name  
* **Current time**, indicated by the NOW marker  
* **Status timeline** showing how the group's status changed over the selected period  
* **Status changes** represented by the corresponding status colors

The timeline allows users to see the status of a group throughout the selected period and identify when a status change occurred.

Groups can be expanded using the arrow next to the group name to view additional information, where available.

**Date and time filters**

The time period displayed on the Status page can be adjusted using the controls at the top of the timeline.

Users can:

* Select a specific **start** and **end date/time** for the timeline.  
* Quickly switch between **1 day, 3 days, and 7 days** views.  
* Navigate to the **previous** or **next time** period using the arrow buttons.  
* Switch between **UTC** and **Local time**.  
* **Zoom in or out** of the timeline using Ctrl/Cmd \+ scroll.

The selected time range determines the period displayed for all groups on the page.

**Search groups**

* If the tenant contains a large number of groups, users can use the **Search groups**... field to find a specific group.  
* Enter the **group name** in the search field to narrow the list of displayed groups.

**Status colors**

The timeline uses colors to make the status of each group easy to identify:

| Status | Description |
| :---- | :---- |
| **OK** | The group is operating normally. |
| **Warning** | The group has a warning condition. |
| **Critical** | The group has a critical condition. |
| **Downtime** | The group is unavailable. |
| **Unknown** | The group status cannot be determined. |
| **No data** | No status information is available for the selected period. |
