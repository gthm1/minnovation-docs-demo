---
title: "XVISION AI - Test planning: Scout remote and Eagle Eye validation"
visibility: public
sidebar_position: 1
---
Scout local pedestrian detection is complete. This plan covers the three phases that remain: Scout in remote processing

mode, then Eagle Eye in local mode, then Eagle Eye in remote mode. It sets the objective, what to test, and the pass

criteria for each, so the work can be scheduled and handed to the field team.

### **Status snapshot**

Scout local established the method we reuse everywhere: fixed 15-degree tilt, target at set distances, detection

recorded at confidence settings from 10 to 50 percent, with the confidence threshold, aggregation interval and

categories all set from the app. The same discipline carries into the phases below.

#### **Phase 1. Scout remote processing**

Objective: Confirm Scout performs the same in remote mode as it does locally, and that data reaches the platform

reliably over the mobile network.

What to test

● Detection parity. Repeat a subset of the local height and distance matrix with processing set to Remote and

confirm detection distance and confidence hold.

●   Data path. Confirm counts and evidence packages arrive intact over 4G LTE at the 300 second aggregation

interval.

● Latency and freshness. Measure the delay from event to data appearing on the platform.

● Resilience. Test behaviour on dropped signal and recovery does the unit buffer and backfill, or lose data.

● Multi-category. Verify People, Cycles and Vehicles report correctly together, not just pedestrians.

Pass criteria

● Remote detection matches local within an agreed tolerance at the same settings.

● No data loss across a sustained run, with buffered backfill after a signal drop.

● Data latency inside the target for the intended use, for example counting versus live view.

Risk: Remote mode depends on the cellular link, so range and confidence findings from the local test still hold, but data

completeness now depends on coverage and buffering. Test on a real, imperfect connection, not a strong one.

#### **Phase 2. EagleEye local**

Objective: Validate EagleEye's full edge capability, which goes well beyond Scout. This is the larger phase and should

mirror the Scout method where it overlaps, then extend to the features Scout does not have.

What to test

● Detection and range. Vehicles, pedestrians and cyclists out to the 100 m spec, using the same tilt, distance and

confidence method as Scout.

● Classification. Accuracy across the vehicle sub-classes and mobility aids the unit claims.

● Stereo depth and trajectory. Check spatial accuracy, distance measurement and tracking that the single-lens

Scout cannot do.



● ANPR. Plate read accuracy out to the 20 m spec.

● Speed. Approach speed accuracy against a reference, and red-light running detection.

● Near-miss analytics. Conflict detection for vehicle, pedestrian and cyclist interactions.

● Controller integration. Response over RS485, BACnet, CAN bus and the digital inputs and outputs, measuring

the response time end to end.

##### **Pass criteria**

● Detection, classification, ANPR and speed each meet an agreed accuracy target against ground truth.

● Controller response is deterministic and inside the millisecond target the product promises.

● Near-miss events are flagged with an acceptable false-positive rate.

Note: EagleEye should be tested against real ground truth, a known count and known plates and speeds, so its results

can be stated as accuracy rather than only model confidence, which is the honest limit of the Scout data.

#### **Phase 3. EagleEye remote processing**

Objective: Validate the remote path for analytics, streaming and cloud connectivity, while keeping the real-time

response loop on the edge where it belongs.

What to test

● Analytics and evidence delivery to the platform and control centre over the network.

● Live streaming of incidents, events and conditions to a control centre.

● Cloud connectivity and, if in scope, V2X messaging.

● Data volume and latency for the richer EagleEye output compared with Scout.

**Pass criteria**

● Streams and analytics arrive reliably with acceptable latency for operations.

● The edge response loop continues to run locally and is not degraded by remote processing.

Key risk: EagleEye is sold on deterministic millisecond response through controller integration. That loop cannot

depend on a remote round trip over cellular. Remote mode here means analytics and streaming, not the safety-critical

signal or near-miss response. Do not set a success criterion that requires real-time control decisions to be made remotely. 

**Sequencing and open decisions**

● Run Phase 1 first. It is small, reuses the finished Scout method, and clears remote mode before the larger EagleEye work.

● Phase 2 is the critical path. Budget the most time here, since stereo depth, ANPR, speed and controller integration are all new.

● Phase 3 follows Phase 2, since remote analytics have little value until local capability is proven.



**Decisions still needed before we start:**

● Accuracy tolerances and pass thresholds for each metric.

● Ground-truth method for EagleEye speed, ANPR and counts.

● Which controller and protocol to test integration against first.

● Whether V2X is in scope for this round or deferred.

Prepared for internal planning.
