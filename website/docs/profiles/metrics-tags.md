---
sidebar_position: 5
title: Metrics Tags
---

## Description
I would like to know the percentage of metrics that appear CRITICAL status (a.k.a failure) due to network problems. Is this possible? . This was a question we had to reply to, some time ago. **And now yes it is possible.** 

In order to support this functionality, some semantics (tags) are added to metrics to categorize them. A metric could be characterized by multiple tags. By this categorization it is easy to conclude into statistics about each metric category. 

An infrastructure may offer various services, of which functionality is checked periodically by metrics. Each metric can be characterized / grouped via different ways. We could say that they could be grouped : 
- by the functionality they check
- the reason for failure
- or any other characteristic

### Example - Metric Tags
For example a metric can be a metric that has to deal with a network or with an authentication check. This means that we may characterize that the service or service component may fail due to network problems or due to authentication problems etc. 
At the same time, this helps the monitoring service to characterize and organize the metrics in groups and provide insights and trends for the different levels of topology (Infrastructure / Groups / Services / Service components) . This helps us easily to conclude into statistics about each metric category. It is useful to acknowledge statistics of each metric category or each metric failure reason, or any other characteristic. 

 - **http.download** is a metric to check if download functionality operates well
 - **http.upload** is a metric to check if upload functionality operates well

 The two metrics can fail due to network problems 

 - **CertValidity** is a metric to check if the certification is valid, it is an authentication check and can fail due to  invalid certificate or connection problems

**the metric tags profile for these metrics could be:**
```json
    {
           "name": "http.download",
           "tags": [
               "network"
           ]
       },
       {
           "name": "http.upload",
           "tags": [
               "network"
           ]
       },
       {
           "name": "CertValidity",
           "tags": [
                     "auth", "invalid","internal"

           ]
       }
```

During the computations the tag information about each metric check is preserved and added to the results when needed. This information can be used for further computations applied on metric tags. 



### Technical part

The connection of the Metric Tags profiles with the other components of ARGO 


They are:
 - defined in POEM 
 - stored in ARGO Web API 
 - Used for the computations in the Analytics Engine 
 - Presented in the ARGO Web UI.





