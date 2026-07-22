---
sidebar_position: 1
---

# Conduit API Reference

Conduit is the API layer that AlphaX Cloud and third-party integrations use to read and
write device data. This page mirrors the structure of the existing
`apidocs.alphax.cloud` site.

## Authentication

All requests require an API key passed in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

## Example: list devices

```
GET /v1/devices
```

Returns a paginated list of devices visible to the authenticated account, including
device ID, status, and last-seen timestamp.

## Example: get device telemetry

```
GET /v1/devices/{device_id}/telemetry
```

Returns recent telemetry readings for a single device.

:::note
Placeholder content for demo purposes — standing in for the live Conduit API reference.
:::
