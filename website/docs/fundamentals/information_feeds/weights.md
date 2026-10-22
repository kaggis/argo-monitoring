---
sidebar_position: 4
title: Weights 
---

In ARGO you may combine top level A/R results (such as results referring to you data center, institution as a whole) into a higher level of abstraction such as organisations, projects, federation.
In this level each member contributes to the final A/R score based on its resource capacity. This contribution is expressed as a weighted average, which is obtained by various ways 
such us by running benchmark on the infrastructure (ex. hep spec 06) 

## How weights are used in the computations 

ARGO Monitoring Service takes into consideration the weights to combine top level A/R results. 

## How can I define the weights

In ARGO we actually define sets of weights applied to top level items (as we've mentioned, those are groups that represent data centers, institutions etc..). The definition includes:
- a name 
- the type of top level group items that the weights are applied to
- the type of weights (related to computational cores, benchmark scores, TFLOPS, storage capacity, etc...)
- And the list of weighted items (tuples of item names along with the weight assigned to them which is usually a float number)

The Json definition of a weight set is described in the example below:

```json
{
    "name": "Example_Weightset",
    "weight_type": "HEPSPEC06_score",
    "group_type": "DATACENTERS",
    "groups": [
        {
            "name": "DC_01_AMSTERDAM",
            "value": 12356.4
        },
        {
            "name": "DC_02_LONDON",
            "value": 16791.5
        },
        {
            "name": "DC_03_FRANKFURT",
            "value": 18791.5
        }
        ]
}
 ```

Monitoring Service has a number of connectors for setting the weights: 

 - VAPOR 
 - CSV files (predefined format)
 - Json files (predefined format)
 - xml files (predefined format)
