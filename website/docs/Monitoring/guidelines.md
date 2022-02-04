---
sidebar_position: 2
title: Guidelines for monitoring probes
---

## Overview

This document describes the policy to develop, package and integrate new probes into the ARGO Monitoring Engine.

## Development

Before starting with development, check if probe already exists on [Nagios Exchange](https://exchange.nagios.org/).

Please refer to the official Nagios documentation for probe development guidelines:

* [Nagios Development Guidelines](https://nagios-plugins.org/doc/guidelines.html),
* [Nagios Plugin API](https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/pluginapi.html).

Probes can be developed in any of these languages:

* Python,
* Perl - in case of Perl use of module `Nagios::Plugin` is highly recommended,
* C/C++,
* shell scripting (Bash, Bourne).

ARGO Monitoring engine currently supports RHEL 7 and derivatives, so probes should use language versions and libraries provided for these distributions.

List of existing probes can be found in [POEM](https://poem.argo.grnet.gr/ui/public_probes/).

Some other conditions:

* Each probe **must** provide the following arguments:

    ```
    -h help (--help)
    -t timeout (--timeout)
    -H hostname (--hostname)
    ```

* The following arguments can also be used if applicable:

    ```
    -p port (--port)
    -u url (--url)
    -v verbose (--verbose)
    -w warning threshold (--warning)
    -c critical threshold (--critical)
    -u username (--username)
    -p password (--password)
    ```

* Maximum output size for test/plugin output is 16KB. Above that limit the output will be truncated.

### Actual Data

Actual data is additional information about service behaviour that can be used in combination with threshold mechanisms to generate new metrics. Probes can report actual data by following the [Nagios guidelines for performance data](https://nagios-plugins.org/doc/guidelines.html#AEN200).

Some other conditions:

* This is the expected format of actual data:

    ```
    'label'=value[UOM];[warn];[crit];[min];[max]
    ```

## Packaging

Probes must be provided in the form of RPM packages, where a single package may contain multiple probes. Please refer to the official EPEL documentation for packaging:

* [EPEL Guidelines And Policies](http://fedoraproject.org/wiki/EPEL/GuidelinesAndPolicies).

Some considerations about naming:

* Package should **ensure a unique namespace by using tenant, project (e.g. eudat, argo) or product team (e.g. cream, htcondor) name**.
* Package name should use **"argo-probe-<project|organisation|team>-<service_name>" form** where `<service_name>` is the name of the service probes are testing (e.g. argo-probe-grnet-agora). For more generic probes (not project specific) name "argo-probe-<service_type>" is also acceptable (e.g. argo-probe-webdav).

Some considerations about structure:

* Probes should be stored in directory:
    * `/usr/libexec/argo/probes/` (For more generic probes (not project specific) directory used by EPEL nagios probes (`/usr/lib64/nagios/plugins/`) is also acceptable.)
* If probes create temporary files, package should create directory:
    * `/var/spool/argo/probes/<probe_namespace>/` with ownership nagios:nagios and permissions 750.
* If probes package contains configuration files, they should be stored in directory:
    * `/etc/argo/probes/<probe_namespace>/`.

Some considerations about dependencies management:

* Each probe is responsible for handling its dependencies.
* The environment needed to execute each probe must be defined by the probe.

## Integration, Testing and Deployment

Each `<tenant|project|product team>` develops and tests its own probes in their development environments. Pre-requirements for the integration and testing of probes are:

* Each `<tenant|project|product team>` publishes probe(s) on an accessible:
    * Git repository with a valid RPM spec file;
    * Yum repository with RPM packages.
* Each probe provides an accessible web page with the relevant documentation.

Integration of new probes starts with adding above information into [POEM](http://argoeu.github.io/poem/v1/).

### Testing

Testing consists of the following steps:

* If the probe is provided in Git repository ARGO will clone it and attempt to build the package.
* ARGO will deploy the RPM package, test and validate the new probe.

### Deployment

Deployment consists of the following steps:

* ARGO in cooperation with the Service owner defines metric templates performed by the new probe in POEM.
* ARGO in cooperation with the Service owner adds mappings between service flavours and metrics in POEM.
* ARGO in cooperation with the Service owner follows project’s procedures for deployment to production.
