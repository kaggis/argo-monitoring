---
sidebar_position: 3
title: "Use Case 2: Monitor an Infrastructure (community)"
---


## Introduction

Use case 2 covers the scenario when infrastructure monitoring requirements cannot be met by EOSC-Exchange Monitoring. For example, one the following are required:

* defining custom topology and aggregation of monitored endpoints
* selecting from existing range of probes and adding custom ones
* managing profiles and metrics for different services

## Solution

In order to start monitoring an infrastructure, an Infrastructure Manager should follow the steps described below. 

### Step 1 EOSC helpdesk request

The Infrastructure Manager opens a ticket on EOSC Helpdesk requesting creation of an ARGO Monitoring instance for monitoring new infrastructure. Minimum information that should be provided in ticket:

* Infrastructure topology
* Personnel responsible for managing profiles
* URLs for POEM and UI components  
  
  

### Step 2 ARGO team initial actions

ARGO team will create a new tenant based on provided information and reply to the initial request that all instances are ready for use.

### Step 3 Define initial monitoring profiles

Minimum set of profiles that must be defined before monitoring can start:

* List of metrics must be selected from the metric repository
* Metric Profile
* Aggregation Profile

### Step 4 Start monitoring

Once all the information has been provided, the monitoring of the service starts and the ARGO monitoring Computation and Analytics component calculates availability and reliability of the service, and creates a report. The Infrastructure Manager can have a look at the A/R and status results from the dedicated UI.  Monitoring new services is described in [Use Case 1](guides/case1.md).