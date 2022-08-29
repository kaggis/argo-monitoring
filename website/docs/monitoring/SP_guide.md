---
sidebar_position: 1
title: Monitoring guide for Service Providers
---

## Overview

The ARGO Monitoring service provides a flexible and scalable framework for monitoring status, availability and reliability of a wide range of services provided by infrastructures with medium to high complexity. ARGO generates reports using customer defined profiles (e.g. for SLA management, operations, etc.). During the report generation, ARGO takes into account custom factors such as the importance of a specific service endpoint and scheduled or unscheduled downtimes.

## Topology

Topology database is actually a central registry for e-Infrastructure topology. 

### Topology information

Monitoring service relies on topology database to provide the following information:

* the **monitored service(s)**,
* the **service types** they are running (e.g. wiki),
* the **service endpoints** of the service (e.g. endpoint),
* the **way they are organized** (e.g. in groups of sites, in groups of services),
* the **service actors** (owners, admins, contact points).

## Metrics & probes

A metric is a procedure that checks specific functionality of a given service, i.e. a single measurement. For example:
* [org.nagios.WebCheck](https://poem.argo.grnet.gr/ui/public_metrictemplates/org.nagios.WebCheck): checks the http if it responds;
* [eu.egi.CertValidity](https://poem.argo.grnet.gr/ui/public_metrictemplates/eu.egi.CertValidity): checks the validity of a certificate.

### Service probe

Probe is piece of code which implements single or multiple tests. All the probes intended to be used for monitoring must comply with the [guidelines for monitoring probes](guidelines.md).

The owners of the service are the ones that **know exactly how the service is working**. The service development team with the support of the monitoring team is responsible to implement the probe that checks and at the same time mimics the actual end user behaviour without requiring special privileges or special configurations.

Before you start implementing your probe, please check in the [POEM library](https://poem.argo.grnet.gr/ui/public_probes) if appropriate probe is already used for monitoring services.

## Setting up service monitoring

![](/img/Monitoring/flowchart.png)

