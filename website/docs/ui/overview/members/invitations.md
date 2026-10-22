---
title: "Invitations"
sidebar_position: 14
---

## Overview

The Monitoring Service allows Tenant Administrators to invite additional users to collaborate within their tenant. Invitations provide a secure and controlled way to grant access without requiring manual intervention from the Monitoring Team. By assigning roles through invitations, Tenant administrators can ensure that users receive the appropriate level of access to perform their responsibilities. This functionality is under the section **Members.**

## **Why Use Invitations?**

Invitations simplify tenant access management by allowing administrators to:

* Grant access to new users.  
* Assign the appropriate permissions from the beginning (assign them to specific groups).  
* Maintain visibility over who has access to the tenant.

This approach helps organisations onboard new users quickly while maintaining control over tenant functionalities.

## **Creating an Invitation**

Tenant Administrators can invite users directly from the Invitations section.

To create an invitation:

1. Visit the monitoring Service and Login   
2. VIsit the Members Panel  
3. Open the **Invitations** tab.  
4. Select **Create Invitation**.  
5. Enter the email address of the user you would like to invite.  
6. Select the role that should be assigned.  
7. Submit the invitation.

Once submitted, the invitation appears in the invitation list and awaits a response from the recipient.

## **Invitation and Roles**

When creating an invitation, **Tenant Administrators** can choose the role that best matches the user's responsibilities:

* **Tenant Administrator**  
  * Has full access to tenant management capabilities, including:  
    * Managing tenant settings.  
    * Creating and managing invitations.  
    * Monitoring tenant provisioning and status information.  
    * Managing tenant resources.  
* **Tenant Topology Manager**  
  * Can configure and manage the infrastructure topology of the tenant.  
* **Tenant Status Pages Manager**  
  * Can create, modify, and manage the public status pages.  
* **Tenant Viewer**  
  * Has read-only access to tenant information and monitoring data.  
  * *Note: This role is intended for users who need visibility into the tenant but do not require administrative privileges.*

## **Monitoring Invitations**

The **Invitations List** (Members/Invitations) page provides comprehensive visibility into all invitations associated with the tenant.

Administrators can review:

* **Recipient:** Who has been invited.  
* **Role:** Which role has been assigned.  
* **Creation Date:** When the invitation was created.  
* **Status:** The current invitation status. Each invitation progresses through one of the following statuses:  
  * **Pending**: The invitation has been created and is awaiting a response from the recipient.  
  * **Accepted**: The recipient has accepted the invitation and has been granted access to the tenant with the assigned role.  
  * **Rejected**: The recipient has declined the invitation. No access has been granted.

### 

| 💡 Benefit: This allows administrators to easily track pending invitations and confirm exactly when users have joined the tenant. |
| :---- |

### Invitation Workflow

The invitation process follows a simple workflow:

1. **Creation:** A Tenant Administrator creates an invitation.  
2. **Delivery:** The invitation is sent to the selected user.  
3. **Review:** The user reviews the invitation details.  
4. **Response:** The user accepts or rejects the invitation.  
5. **Provisioning:** If accepted, access is granted automatically according to the assigned role.

This process provides a simple and auditable mechanism for managing tenant access while reducing administrative overhead.

## Handling Invitations (User Perspective)

Invited users have full control to review the invitation details and choose whether to accept or reject the request.

#### Accepting an Invitation

Invited users can review the invitation details and choose whether to accept or reject the invitation. When an invitation is accepted:

* The user is automatically granted access to the tenant.  
* The assigned role becomes active immediately.  
* The invitation status changes to **Accepted**.

#### Rejecting an Invitation

If a user rejects an invitation:

* No access is granted.  
* The invitation status changes to **Rejected**.  
* A new invitation must be created if access is required in the future.

