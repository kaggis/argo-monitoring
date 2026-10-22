---
title: "Availability & Reliability"
sidebar_position: 24
---


**Availability & Reliability**

Knowing that a service is monitored does not by itself indicate whether it was consistently available or how reliably it operated over time. A service may be operational for most of the monitoring period while experiencing outages, scheduled maintenance, or periods where its status cannot be determined. **Availability and Reliability provide complementary measures that help quantify service operation and understand how consistently a service was available for use.**

ARGO Monitoring Service calculates both metrics from the **status timelines** generated for monitored items. These timelines record how the status of a monitoring item changes over time, allowing ARGO Monitoring to determine the duration for which the item was in an **UP**, **DOWN**, **UNKNOWN**, or **scheduled DOWNTIME** state.

**Availability** measures the proportion of the **known monitoring period** during which the service was operational. The known period excludes time for which the monitoring status is unknown, while scheduled downtime remains part of the calculation. Therefore, scheduled maintenance is treated as downtime for Availability purposes and contributes to the overall result.

**Reliability** provides a complementary view by excluding scheduled downtime from the calculation. It measures how the service behaved during the periods when it was expected to be available. Scheduled maintenance therefore neither penalizes nor improves the Reliability result.

The two metrics consequently answer slightly different questions:

* **Availability:** **“How much of the known monitoring period was the service available?”**  
* **Reliability:** **“How reliably did the service operate when it was expected to be available?”**

Both metrics are derived directly from the status timeline and can therefore be calculated consistently across different levels of the monitoring topology. They can be used to evaluate individual monitoring endpoints as well as higher-level services or other topology elements.

Together, Availability and Reliability provide a more complete view of service operation. **Availability gives the overall picture of service presence, including scheduled downtime, while Reliability focuses on the quality and consistency of service operation during expected operational periods.**

## Core Concepts

### Why Use Availability and Reliability? 
Availability and Reliability provide complementary views of service operation. Availability gives an overall measure of how much of the known monitoring period the service was available, including the impact of scheduled downtime. Reliability focuses on how well the service operated during the periods when it was expected to be available. Together, they provide a clear and balanced view of service operation over time. 

Measure service operation over time — Availability and Reliability transform the information contained in status timelines into measurable indicators, making it easier to understand how a service behaved during a specific monitoring period. 
1) Provide a clear, objective measure — instead of interpreting detailed status timelines, stakeholders can use Availability and Reliability as clear, measurable indicators of service operation.
2) Support SLA and service-level accountability — Availability provides an unambiguous measure for assessing whether a service met its defined availability objectives, while Reliability provides additional insight into how consistently the service operated during its expected operational periods.
3) Provide a complete view of downtime — Availability includes scheduled downtime in its calculation, ensuring that planned outages are visible in the overall availability result. Reliability excludes scheduled downtime, allowing planned maintenance to be separated from unexpected service failures.
4) Provide a fair view of operational performance — Reliability focuses on the periods during which the service was expected to operate, so planned maintenance does not negatively affect the assessment of normal service operation.
5) Distinguish planned maintenance from unexpected failures — using both metrics helps stakeholders understand whether a lower Availability is primarily associated with scheduled maintenance or whether the service experienced failures during its expected operational time.
6) Apply consistently across the monitoring topology — because both metrics are derived from status timelines, they can be calculated consistently for monitoring items at different topology levels, from individual endpoints to higher-level services or sites.
7) Use complementary metrics rather than a single measure — Availability and Reliability are designed to be interpreted together. Availability provides the overall picture, while Reliability provides the operational picture, helping stakeholders distinguish between a service being offline as planned and a service failing when it should have been available.

## View in the UI 

The **Availability & Reliability** page provides a monthly overview of the availability and reliability of the monitoring groups for a selected tenant and report.

The results are presented in a table, with each row representing a monitoring group and each column representing a month. For every group, two values are displayed:

![](/img/ui/image21.png)

* **Av** — the **Availability** percentage for the selected month. It represents the proportion of the known monitoring period during which the service was available, including the impact of scheduled downtime.  
* **Re** — the **Reliability** percentage for the selected month. It represents how reliably the service operated during the periods when it was expected to be available, excluding scheduled downtime.

If the tenant has more than one report, the UI allows users to select a report from the **Select a report:** drop-down list and view its corresponding monthly results. This makes it possible to compare the Availability and Reliability of monitoring groups across different months and identify changes in service operation over time.

For example, a group showing **100% Availability and 100% Reliability** was available throughout the known monitoring period and had no periods of service failure during its expected operational time. A difference between the two values indicates that scheduled downtime has contributed to the Availability result while being excluded from the Reliability calculation.

The results provide a quick overview of service operation and allow administrators to identify groups that may require further investigation by examining their underlying monitoring status and downtime information.

Users can also filter the availability & reliability results by group, searching for specific groups in the **search group** area

Users can export the results in the form of a CSV file by selecting **CSV** from  the **Export** drop-down list

![](/img/ui/image15.png)
