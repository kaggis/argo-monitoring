---
title: "Glossary"
sidebar_position: 2
---




## Core Concepts

| Concept / Term  | Definition |
| ----- | ----- |
| **Tenant** | A tenant represents a logically isolated environment within the monitoring service. Tenants provide a structured way to organise monitoring resources and user access. Provisioning a tenant is the foundational step when onboarding a new organization or service. |
| **Multi-tenant architecture** | The Monitoring Service operates on a multi-tenant architecture. It can therefore manage multiple logically isolated tenant environments, with each tenant maintaining its own monitoring resources, topology information, user access, roles, etc.  |
| **Resources / Services** | The monitored items that make up a tenant's infrastructure. Examples include web portals, APIs, identity management (IAM) services, hosts, and other services or resources whose availability and health are monitored by the Monitoring Service. |
| **Topology** | Before the monitoring engine can track status, surface alerts, or report on the health of your environment, it needs a structured description of that environment: the items it should watch and how they are organized. This description is what you declare as a topology. |
| **Endpoint(s)** | Endpoints are the fundamental unit of the topology. Each endpoint represents a single monitored item (such as a service, resource, or host) identified by a unique service name and URL. When an endpoint is declared, the service begins tracking its availability and health. |
| **Group(s)** | Endpoints can be organized into logical groups, making larger topologies easier to manage, as well as allowing per-group alerts and notifications.  |
| **Topology feed** | The data source the service uses to populate the topology.  |
| **Internal feed** | Administrators manually create and maintain endpoints and groups through the Topology UI.  |
| **External feed** | The data source is an external system. The Monitoring Service retrieves topology information from a URL, CSV file, or third-party service catalog and synchronizes its topology accordingly. |
| **Availability** | Percentage of time a service is fully functional and accessible, based on monitored status history. |
| **Reliability** | Percentage of time a service operates without failures, based on monitored status history.  |
| **Status** | Real-time chronological health timelines, tracking states between OK, Warning, and Critical transitions. |

## User Roles
| Concept / Term  | Definition |
| ----- | ----- |
| **Super Administrator (super\_admin)** | The only person authorized to build new tenants, handle the initial setup, and delete them. They ensure all necessary resources are ready and correctly configured before activating the new environment. |
| **Tenant Administrator (tenant\_admin)** | The person responsible for the day-to-day management of a tenant. After accepting the handover, the tenant\_admin has full control over the tenant, including managing tenant settings, topology, members, invitations, and operational activities.  |
| **Tenant viewer** | A user with **read-only** access to tenant information and monitoring data. |

## Tenant Setup
| Concept / Term  | Definition |
| ----- | ----- |
| **Provisioning** | The process of supplying, preparing, or making available the resources required for a particular purpose.  |
| **Tenant provisioning** | The process of preparing the services and infrastructure components required for a new tenant before it can use the Monitoring Service.  |
| **Automated provisioning** | An automated workflow that prepares a tenant without manual intervention by orchestrating the provisioning process after a single trigger.  |
| **Provisioning workflow** | The sequence of provisioning tasks executed to prepare a tenant environment for operation.  |
| **Automation job** | The first step toward automation is converting each manual provisioning step into a discrete, trackable automation job. Each job encapsulates one provisioning responsibility and reports its status at every stage of execution.  |
| **Dependency** | A prerequisite relationship between provisioning jobs in which one job depends on the successful completion of another. |
| **Cascading reset** | A mechanism that automatically resets dependent provisioning jobs when an upstream prerequisite is reset or becomes invalid. |
| **Readiness check** | A verification process that confirms all required services have been successfully initialized and that the tenant is ready for operation. |


## Service Components
| Concept / Term  | Definition |
| ----- | ----- |
| **POEM** | POEM is a configuration and management tool that manages **catalogues** of services and directs how the **monitoring** system tests them. The name directly reflects the two core components it manages within the monitoring ecosystem: **P**rofile: It groups different monitoring tests and service definitions into specific configurations, or "profiles". **M**etric: It describes and defines the individual check procedures (probes) used to test whether a service is working properly. |
| **ARGO Messaging Service (AMS)** | The [ARGO Messaging Service](https://argoeu.github.io/argo-messaging/docs) is a real-time messaging service that allows the user to send and receive messages between independent applications.  |
| **Compute Engine** | The Compute Engine is the backend processing infrastructure of the Monitoring Service. It executes monitoring-related operations, prepares default profiles and reports for new tenants, and performs the ingestion and computation of monitoring data. |
| **Monitoring Box** | The Monitoring Box is the service that completes the tenant's monitoring environment. It enables monitoring data collection and processing, allowing monitoring operations to begin once provisioning is complete. |
| **Topology Connector** | The Topology Connector is the component that establishes communication with topology-related services and enables topology synchronization by retrieving topology information from the configured topology source. |

