---
title: "Managing Status Pages"
sidebar_position: 18
sidebar_label: "Status Pages"
---

Status Pages provide a structured view of the operational status of monitored services and groups within a tenant. They enable organisations to communicate service availability, planned maintenance activities, and ongoing incidents to users, in a transparent and consistent manner.

### What is a Status Page  

**Public Status Page** – a publicly accessible view, used for external communication of service health. The Public Status Page is accessible without authentication and is intended for external users. It provides:  
1) a high-level view of service availability,
2) simplified operational status indicators,
3) and a stable and shareable URL for external stakeholders. 	 

It is designed for transparency and clarity, without exposing internal infrastructure or detailed operational metadata.  

By publishing service health information through Status Pages, organisations can improve communication, reduce support requests, and provide stakeholders with real-time visibility into service status.

## **Why Use Status Pages?**

Status Pages help organisations:

* Communicate service availability to end users and administrators. 	  
* Provide transparency during incidents and maintenance events. 	  
* Reduce support overhead by proactively sharing service status information. 	  
* Build trust through timely and accurate operational updates. 	  
* Centralise service health information in a single location. 	

This approach ensures that both external users (via the public page) and internal users (via the tenant dashboard) can quickly understand whether services are operating normally or experiencing issues.

## **Managing Status Pages**

### Create a Status Page

Administrators and Tenant Administrators can create Status Pages directly from the Status Pages section.

To create a new Status Page:

* **Open** the Status Pages page.  
* **Select** Create Status Page.  
* Configure the required settings in the available tabs.

### Config Tab

The Config tab allows you to define the basic information and data sources used by the Status Page.

* **Configure Page Settings:** Configure the general information required to identify and access the Status Page  
  * **Name** : Enter the display name of the Status Page. This field is mandatory. The name is used to identify the page within the application.  
  * **Path**: Enter the unique URL path used to access the Status Page. This field is mandatory. The path determines the location of the Status Page within the application and must be unique. The value is automatically generated based on the Status Page name but can be modified manually if required.

### Configure Data Source

Define the tenant and reports that provide the monitoring information displayed on the Status Page. A Status Page is associated with a specific tenant and uses its monitoring data and service reports to display service availability and health information.

* **Tenant**: Select the tenant whose monitoring information will be displayed on the Status Page. The selected tenant determines the available monitoring data and reports.This field is mandatory.  
* **Available Reports:** Select the reports that will be available as data sources for the Status Page. Reports provide the monitoring information used by Status Page items. Available reports depend on the selected tenant.

### Items Tab

The **Items** tab allows you to define and organize the services displayed on the Status Page.

**Configure Status Page Information**

* **Title**: Enter the title displayed on the Status Page. This field is mandatory.  
* **Description**: Enter a description providing additional information about the Status Page.  
* **Report**: Select the report containing the monitoring data to be displayed. Available services and resources are loaded based on the selected report

### Organize Services into Groups

Services can be organized into groups to control their structure and visibility on the Status Page.

* **Create** a Service Group  
* **Click button** Click here to Add a new group. A new group is created with a default name. To rename the group, click on the group name and update it.  
* **Add Services to Groups**  
  * Select the services that should be displayed on the Status Page.  
  * Services can be added using drag and drop:  
  * Select a service from the report list on the left.  
  * Drag the service.  
  * Drop it into the desired group.  
  * The selected services will be displayed under the corresponding group on the Status Page.

### Configure Theme and Appearance

The appearance settings allow you to customize the visual presentation of the Status Page. You can configure colors, themes, branding options, and status display preferences to match your organization's requirements.

### Customize Appearance

Configure the following options:

**Color:** Select the primary color used for the Status Page theme.

**Theme:** Select the visual theme that defines the overall style and appearance of the Status Page.

**Logo:** Configure whether a logo is displayed on the Status Page.

Enable this option to add organization branding or a custom logo.

**Status Icon:** Configure the icon style representing the service status. Status icons help users quickly identify the current condition of monitored services. Options include : Led or Icon.

**Status Text**: Configure how status labels are displayed. Options include:

Displaying or hiding status text. 

Displaying status text as badges.

**Status Columns:** Configure the number and layout of columns used to display service status information.This setting controls how monitoring items are arranged to improve readability.

**Save Configuration**

After completing the configuration, click Save to apply the changes and create or update the Status Page configuration.

## Updating a Status Page

Status Pages can be updated at any time. Administrators and Tenant Administrators can modify the information and configuration settings that were defined during the Status Page creation process.

To update a Status Page:

1. Select **Status Pages** from the menu.  
2. From the list of available Status Pages, locate the page you want to update.  
3. Click the **Edit Page** button in the **Actions** column.  
4. You will be redirected to the Status Page configuration screen.  
5. Apply the required changes.  
6. Click **Update** to save the modifications.

The Status Page configuration will be updated with the new settings.

## Viewing Status Pages

Administrators, Tenant Administrators, and Tenant Viewers can access a tenant's Status Page to view service availability, health information, and current status.

To view a Status Page:

1. Select **Status Pages** from the menu.  
2. From the list of available Status Pages, locate the page you want to view.  
3. Click the **View Page** button in the **Actions** column.  
4. You will be redirected to the Status Page information view, where you can review the displayed services and their current status.

