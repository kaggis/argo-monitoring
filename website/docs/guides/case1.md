---
sidebar_position: 2
title: "Use Case 1: Monitor an Onboarded Service (central one)"
---



## Introduction

This use case covers the scenario to monitor a service Onboarded to EOSC via the Providers Portal. The results of this process will become available via the EOSC Exchange Monitoring WebUI ([https://argo.eosc-portal.eu](https://argo.eosc-portal.eu/)). In order to start monitoring an onboarded service, several requirements should be met. In addition to the basic information provided during the onboarding process, the service provider needs to provide some extra information needed by the ARGO monitoring service, described in the section below. 

## Solution

In order to start monitoring a service, a customer should follow the steps described below. 

### Step 1 Onboard the service

Before the service can be monitored, it should be onboarded into the EOSC Portal. The procedure for service on-boarding is described in detail in the [EOSC portal onboarding process wiki page](https://wiki.eoscfuture.eu/display/PUBLIC/EOSC+Portal+Onboarding+Process). 

### Step 2 Provide additional info for monitoring

When the service has been successfully onboarded, the ARGO monitoring service requires some additional information. First and foremost, the monitoring service requires the probes  and metrics to  be associated with the service. 

Once the service provider decides on the probes/metrics they wish to use, the metrics should be mapped to the service they wish to monitor in EOSC-Exchange Metric Profile. After the metric profile, aggregation and thresholds profiles should also be updated.

### Step 3 Start monitoring

Once all the information has been provided, the monitoring of the service starts and the ARGO monitoring Computation and Analytics component calculates availability and reliability of the service, and creates a report. 

The Service Provider can have a look at the A/R and status results from the EOSC-Exchange Monitoring UI.