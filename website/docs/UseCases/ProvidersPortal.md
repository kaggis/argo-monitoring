---
sidebar_position: 2
title: Providers Portal Use Case
---

The EOSC Providers Portal (https://providers.eosc-portal.eu/) is a single platform for providers to onboard their organization into EOSC portal, register and manage their resources and gain rich insights about their offerings in the catalogue. It also offers the Provider dashboard, where representatives from provider organizations have a detailed view on their offerings in the EOSC portal as well as various usage statistics on their resources. 

EOSC Monitoring (https://monitoring.eosc-portal.eu/) is the key service needed to gain insights into the Resources Onboarded in EOSC. It is continuous and on-demand to quickly detect, correlate, and analyse data for a fast reaction to anomalous behaviour. EOSC Monitoring continuously checks the service so   
- Providers can have a more reliable service with better availability 
- Users select the service without facing unexpected service errors. 

The EOSC Providers Portal is integrated with the EOSC Monitoring  and it allows Providers to specify monitoring aspects for their resources, whilst at the same time it presents monitoring statistics. From the techical point of view the EOSC Monitoring API is used to fetch information about the availability and reliability of the services. Each service has a unique id in the EOSC ecosystem and this supports the integration of both systems, as it is used as a unique identifier in both systems. The EOSC Monitoring API offers the latest availability/reliability results either in a daily or a monthly basis. 

Providers Portal uses Monitoring data to display a diagram for each service as you can see in the example below.

![Argo Monitoring Service](/img/UseCases/Providers_Portal_usecase.png)

The display of the monitoring data help Providers to: 
- Ιncrease customer satisfaction
- Diagnose and prevent internal , or user related issues
- build trust with the end users or potential new customer
