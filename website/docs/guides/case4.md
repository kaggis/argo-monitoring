---
sidebar_position: 5
title: "Use Case 4: Combine Results of existing ARGO Tenants."
---

### Introduction

This use case covers the scenarios where the topology and the results of multiple tenants need to be combined in a number of reports. 

### Prerequisites

In order to combine results from tenants A, B (example names), those tenants should be already monitored by ARGO Monitoring service complete with the following definitions for each tenant:

* **Latest Data available:** Each tenant should be checked that has an active stream of incoming monitoring data.
* **Topology:** Each tenant should already have a well defined source of topology that includes lists of groups, endpoints and services. 
* **Metric Profile:** In simple terms, a list of all services to be checked along with all relevant metrics per service

### Solution

#### Step 1: Open a ticket to helpdesk 

In order to have results, the customer should create a ticket on the helpdesk describing: 

* Tenants to be used in the combined report
* Services and metrics 
* Aggregation profile.

For each tenant that is going to take part in producing the combined results check that all of the prerequisites (mentioned in the previous section) do apply.

#### Step 2: Creation of the Combined Tenant. 

Create a new tenant that will host the combined report. This tenant will act as a host tenant for the combined results and will rely on the data of the other tenants as input for the computations of the availability, reliability and status results.   

#### Step 3 Start monitoring

Once all the information has been provided, the monitoring of the service starts and the ARGO monitoring Computation and Analytics component calculates availability and reliability of the services, and creates a report. 

The User can have a look at the A/R and status results from the combined reports from the UI.