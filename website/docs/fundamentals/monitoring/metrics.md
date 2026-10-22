---
sidebar_position: 3
title: Metric Management
---

# Metric management

## Introduction

In order to allow users to create their own testing probes and simplify the process of deploying them, there is a token protected API endpoint through which it can be done. In that way all the technicalities have been removed for the end user, and the monitoring team can obtain all the information they might need to set up the monitoring. This should speed up the process of deployment of new testing probes.

## Submitting probe candidates

Probe candidates are submitted through the token protected API in tenant POEM.

```
POST /api/v2/probes/
```

#### Request headers

```
x-api-key: token
Accept: application/json
```

#### POST body

POST body should have the following format:

```json
{
  "name": "poem-probe",
  "description": "A generic probe to check service status. The probe contacts the endpoint and infers from the response if the service is up and running.",
  "docurl": "https://github.com/ARGOeu-Metrics/argo-probe-argo-servicestatus/blob/master/README.md",
  "rpm": "argo-probe-argo-servicestatus-0.2.0-1.el7.noarch.rpm",
  "yum_baseurl": "http://rpm-repo.argo.grnet.gr/ARGO/prod/centos7/",
  "command": "/usr/libexec/argo/probes/argo-servicestatus/check_status.py -u <URL> -t 30",
  "contact": "test@example.com"
}
```


Fields `name`, `docurl`, `command` and `contact` are mandatory. Field `docurl` should be a valid URL with probe documentation, so that the monitoring team knows what the probe actually does, and the `contact` field should be a valid email address, which is going to be used to send information on the progress of probe deployment. 

The `command` field should contain the command with which to invoke the probe. The submitted probes should comply with the [guidelines for monitoring probes](https://argoeu.github.io/argo-monitoring/docs/monitoring/guidelines). If the probe is invoked with endpoint-specific values (e.g. hostname, or URL like in the example here), it is useful to use angle brackets, so that it is easier for the monitoring team to understand that this is the endpoint-specific value. If there are any uncertainties, the monitoring team will contact the submitter using the email address provided in the `contact` field.

Instead of providing the `.rpm` package and YUM repo base URL, users may also provide a script with the tests, and the monitoring team will create a proper package. In that case, the POST data must have the following format:

```json
{
  "name": "poem-probe",
  "description": "A generic probe to check service status. The probe contacts the endpoint and infers from the response if the service is up and running.",
  "docurl": "https://github.com/ARGOeu-Metrics/argo-probe-argo-servicestatus/blob/master/README.md",
  "script": "https://some.url.com/script",
  "command": "check_status.py -u <URL> -t 30",
  "contact": "test@example.com"
}
```

It is mandatory to provide either `script` field, or `rpm` and `yum_baseurl` field. It is also possible to provide only an `.rpm` package, in which case the `rpm` field **must** be a valid URL.

After successful submit of the probe candidate, the submitter will receive an email with the confirmation to the email address provided in the `contact` field. 

## Steps to probe deployment

### Submitting

The first step is obviously submitting the probe to tenant POEM. After the probe candidate has been successfully submitted, the monitoring team is notified, and the candidate's status is set to `submitted`.

### Processing

The monitoring team will review the submitted probe, make the necessary configurations in POEM, prepare a dedicated service type, and set its status to `processing`. The submitter will then be notified about the change of status. If there are any additional information necessary, the submitter will be contacted by the monitoring team. This step is necessary for proper testing of the probe in devel environment.

### Testing

When the monitoring team has all the necessary information, the probe testing can start. The monitoring team will change the status of the probe candidate to `testing`, and the submitter will be notified about the change of status. At this point, they will also be provided with the URL to the monitoring UI where they can check the status of their probe. The probe will remain in testing for at least 3 days.

### Deployment

If the probe test has been successful (the monitoring team is happy with the probe performance in the devel environment), the probe can be moved to production. If there were not any problems, there will be no additional action required from the submitter, and the probe's status will be set to `deployed`. The submitter will be informed of the deployment of the probe, and they will be provided with the new UI URL, this time pointing to the production status page of the probe.

### Rejection

If during any of the steps described above the problems have been identified which could not be mitigated, the probe candidate's status will be set to `rejected`, and it will not be deployed to production. The submitter will be notified about the status change, and provided with a detailed explanation.