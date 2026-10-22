---
title: "Managing Tenants"
sidebar_position: 1
sidebar_label: "Tenants"
---

The Monitoring Service operates as a software-as-a-service on a **multi-tenant architecture**, empowering administrators to seamlessly create and manage distinct operational environments.

### What is a tenant 

A customer (infrastructure, community, independent group of services) defined as a tenant in the monitoring service represents a logically isolated environment within it. Each tenant defines a dedicated, secure boundary for: Monitoring resources and metrics Infrastructure topology information User access and role-based permissions External integrations and alerting workflows 

**Provisioning a tenant is the foundational step when onboarding a new organization or service.**

## Why Create a Tenant?

The creation of a tenant provides a structured way to isolate and organise monitoring resources and user access. By creating separate tenants, the key benefits are:

* **Data Isolation:** Securely separate monitoring data and configurations between distinct infrastructures, services, or projects.  
* **Access Control:** Assign dedicated administrators and viewers to maintain strict, clear ownership.  
* **Custom Configurations:** Enable tenant-specific resources and integrations without cross-environment interference.

This approach enables secure and scalable management of monitoring environments.

## The UI

The Monitoring Service provides a centralized web interface designed for intuitive administration. Through the **Tenants** dashboard, administrators can view real-time environment statuses and perform configuration updates.

### **Managing Tenant Information**

The lifecycle of a tenant is managed through **a clear separation of duties** between **service-level** (super\_admin) and **tenant-level** administrators (tenant\_admin). 

The Super Administrator **(super\_admin)** is a user who has complete access all over the monitoring service (to all features, users, etc.). The Tenant Administrator (tenant\_admin) is the one that has access to the data / features of the tenant(s) they own.  

The workflow is as follows:

* **Step 1 | The Super Administrator creates the tenant:** The super\_admin is the only person authorized to build a new tenant and handle the initial setup. They validate that all necessary resources are ready and correctly configured before activating the new environment.  
* **Step 2 | The Handover:** Once the tenant is initialized, the super\_admin invites a designated tenant\_admin to take over.  
* **Step 3 | The Tenant Administrator manages the tenant:** After accepting the invitation, the tenant\_admin gains full control. They have total autonomy to customize the environment, invite other users, and handle daily operations without further input from the super\_admin.

There are occasions where a single user acts as the tenant\_admin for multiple organizations or projects. For this case, the interface provides a seamless context switcher, which is **The Tenant Selector.** The Tenant Selector is a dropdown menu located at the top left of the interface. Selecting a different tenant from this dropdown instantly updates the workspace context.

Once a specific tenant is selected, the main **Overview Page** dynamically populates to display the following critical data points for that environment:

* **Tenant Details:** Fundamental identity data, unique IDs, and primary organizational contacts.  
* **Provisioning & Operational Status:** Real-time health metrics and availability statuses of the underlying tenant resources.  
* **Readiness**: Real time check of the data readiness (all the required data are available to start the monitoring process).

### **Create a Tenant** 

| This action can only be performed by Super Administrators. |
| :---- |

Implementing a tenant-based structure establishes secure, scalable management of complex monitoring environments. 

Once the tenant is created and becomes available in the tenant list, the following information is available. 

**Tenant Information**

When creating a tenant the following information is required:

* Tenant Name – A unique name used to identify the tenant.  
* Description – An optional description of the tenant's purpose.  
* Contact Information – Details of the primary tenant contact.  
  * **Name:** The full name of the contact person —who may also be the tenant\_admin— responsible for communications on behalf of the tenant. This field is mandatory.  
  * **Email:** The email address of the contact person. This address will be used for official communications, notifications, and correspondence related to the tenant. This field is mandatory.  
  * **Type:** The contact type to define the role or category of the contact person (for example, administrative, operational, security or other). This field is mandatory.

**Infrastructure Metadata \- URLs** 

The Overview page displays the basic information for the selected tenant, including the URLs that provide access to the different interfaces associated with the tenant environment.

**UI URL – Provides access to the tenant's user interface (UI).**

**POEM URL – Points to the POEM service endpoint associated with the tenant.**

* **UI URL** \-  Provides access to the tenant's user interface (UI).  
- **POEM URL** The URL of the tenant's POEM instance. This URL points to the POEM service endpoint associated with the tenant.

**Internal Lists** 

On the right side of the page the tenant\_admin can view the communication lists of individuals associated with relevant responsible departments (e.g. administration, operations, security) associated with the tenant. Used for internal communication related to tenant operations.

- **Email:** The email address of the internal mailing list. This address will be used as the recipient for relevant communications and notifications.  
- **Type:** The type or purpose of the mailing list (for example, administrative, operational, security or other).

**Performance**

- A toggle button exists to inform if the Performance feature is enabled or disabled for the tenant

**Public Downtimes**

- A toggle button exists to inform if the Public Downtimes feature is enabled or disabled for the tenant

### **Update a tenant**

| This action can be performed by both Super and Tenant Administrators.  |
| :---- |

Tenant information can be modified at any time by both the super\_admin and the tenant\_admin. Updating tenant details ensures that the configuration remains accurate and up to date as organizational requirements evolve. Changes can be made to tenant settings, contact information, and configuration parameters without creating a new tenant.

To update a tenant:

1. Open the **Overview** page of the tenant you want to update. If you have access to multiple tenants, ensure the correct tenant is selected using the **Tenant Selector**.  
2. Click **Edit Tenant** in the top-right corner.   
3. Reviewing the configuration before saving helps prevent configuration issues and ensures a consistent tenant setup. So before you save any changes, ensure that:   
   1. Required fields contain valid values.  
   2. Contact information is accurate.  
   3. Configuration settings match operational requirements.  
   4. The changes do not conflict with existing tenant resources.  
4. Click **Update** to apply all changes immediately. 

![](/img/ui/image11.png)

### **Delete a Tenant**

| This action can only be performed by Super Administrators. |
| :---- |

Deleting a tenant permanently removes its configuration and associated access within the Monitoring Service. 

Once confirmed, the tenant is removed from the system and is no longer available across the Monitoring Service.

### Important Notes on Deletion 

- Tenant deletion is permanent and cannot be undone. 
- All associated configurations may be lost upon deletion.
- Proper verification is strongly recommended before confirming the action. 
- Only Super Administrators can perform this operation. 