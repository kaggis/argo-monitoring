---
sidebar_position: 4
title: Metrics Profile
---

## Description
An infrastructure may offer various services. These services need to be checked periodically in order to decide their operational state. The various functionalities of a given service are checked by metrics (a chunk of code). For example a metric such as Web-Site.Portal-WebCheck runs on a site and checks if the http connection responds or not. The results of the metrics are computed, into ARGO Monitoring Service calculations, in order to conclude into the operational state of the service, during a specific period.
In order to conclude about the operational state of the service, all or part of the metrics that check the service’s functionality should be taken into account. In Metrics Profiles are included, for each service, these metrics whose results are considered to the computations of the service’s state.


##### Example 1  - Metrics Profile for a Site service: 
A service of type Site runs on host1.example.com. The Site service should operate properly, be accessible and some actions should be available such as downloading or uploading material (documents, images etc).
Three metrics can apply on the service to check it’s functionalities:
* __Portal-WebCheck__ is a metric to check if the http responds
* __http.download__ is a metric to check if download functionality operates well
* __http.upload__ is a metric to check if upload functionality operates well

The  site is assumed to operate properly if it is accessible and can support downloading material. Uploading material does not affect the state of the service (whether it is working properly or not). So in the Metrics Profile, the metrics **Portal-WebCheck** and **http.download** will be defined in order to be taken into account for concluding the status of the Site.


#### Example 2  - Metrics Profile for a Repository service:

A service of type Repository runs on host2.example.com. The repository is considered to operate properly if it is accessible and validates the provided certificates. Two metrics can apply on the service to check it’s functionalities:
* __Portal-WebCheck__ is a metric to check if the http responds
* __CertValidity__ is a metric to check if the certification is valid

In order to conclude the operational state of the repository  both functionalities should operate properly. So in the Metrics Profile both metrics will be defined in order to be taken into account for concluding the status of the Repository.

**The above examples could be represented by the following Metrics Profile definition:**

```json 
"services": [
               {
                   "service": "WEB-SITE",
                   "metrics": [
                       "http.download",
                       "Portal-WebCheck"
                   ]
               },
               {
                   "service": "www.example-repository.com",
                   "metrics": [
                       "Portal-WebCheck",
                       "CertValidity"
                   ]
               }
      ]
```
          


