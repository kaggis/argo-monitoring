---
sidebar_position: 8
title: "Process events/alerts directly from the source(AMS)"
---

All the events that compromise the produced alerts of the monitored
services travel through [The Argo Messaging Service.](https://argoeu.github.io/guides/messaging/)
Through its supplementary tool, the [argo-ams-library](https://argoeu.github.io/ams-library/)
a client can access the source directly and inspect the events, process them and even create its own
downward syncs.Although its recommended to use the library to interact with the
messaging service, you can also use plain HTTP requests.

### Initialising a connection

```python
    # set up the ams client
    ams_host = "{0}:{1}".format("example.com", str(443))
    ams = ArgoMessagingService(endpoint=ams_host, project="test", token="secr3t")
```

### Consume Events from a Subscription

Topics are collections in the messaging service, that group events logically.
THe clients indicate which message goes to which topic.In order to consume events
from a topic an assigned subscription to the desired topic is required.
A topic can habe multiple subscriptions and the events will be replicated across
all the attached subscriptions, meaning that no race data conditions may ever happen.

```python

    while True:
        try:
            # consume alerts
            consumed_messages = ams.pull_sub(sub="test-sub", return_immediately=True, verify=True)
            
            if len(consumed_messages) == 0:
                continue
            
            payload = consumed_messages[0][1].get_data()
            ack_id = consumed_messages[0][0]

            # if we can't parse the message body we should ack the message and move to the next
            try:
                payload = json.loads(payload)
                LOGGER.info("Examining new message {0} . . .".format(ack_id))
                
                # here we can implement any filtering functionality
                # after we ave successfully parsed the message payload
                if !has_desired_payload(payload):
                    continue
                
            except Exception as e:
            
                # in case we cannot parse the payload, we should ACK the message
                # in order for the consumtion mechanism to bring us the next one
                LOGGER.error("Cannot parse payload for message {0}.{1}.Skipping . . .".format(ack_id, str(e)))
                try:
                    ams.ack_sub(sub=args.sub, ids=[ack_id], verify=True)
                    continue
                except AmsException as e:
                    LOGGER.error("Could not skip message {0}.{1}".format(ack_id, str(e)))
                    continue

```

### Publishing Events to a Topic
```python
            
            # after we filtered messages with the appropriate payload
            # we can reformat our message and send it to another topic
            # for example to archive some specific info about the event
            formatted_message = format_message(payload)
            try:
                ams.publish(topic="test-topic", msg=[AmsMessage(data=formatted_message)], verify=True)
            except AmsException as e:
                LOGGER.error("Could not publish to topic.{0}".format(str(e)))
                continue

            # ack the original event in order for the consumption
            # mechanism to bring the next event
            try:
                ams.ack_sub(sub=args.sub, ids=[ack_id], verify=true)
            except AmsException as e:
                LOGGER.error("Could not ack original event {0}.{1}".format(ack_id, str(e)))
        except AmsException as e:
            LOGGER.error("Cannot pull from subscription.{0}".format(str(e)))

```