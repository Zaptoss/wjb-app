# OffersApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1FlowsFlowIdOffersGet**](#apiv1flowsflowidoffersget) | **GET** /api/v1/flows/{flowId}/offers | Retrieve a list of offers within a specific flow|
|[**apiV1FlowsFlowIdOffersPost**](#apiv1flowsflowidofferspost) | **POST** /api/v1/flows/{flowId}/offers | Create a new offer within a specific flow|
|[**apiV1OffersOfferIdConditionGroupsGet**](#apiv1offersofferidconditiongroupsget) | **GET** /api/v1/offers/{offerId}/condition-groups | Retrieve a list of condition groups for a specific offer|
|[**apiV1OffersOfferIdConditionGroupsPost**](#apiv1offersofferidconditiongroupspost) | **POST** /api/v1/offers/{offerId}/condition-groups | Create a new condition for a specific offer|
|[**apiV1OffersOfferIdDelete**](#apiv1offersofferiddelete) | **DELETE** /api/v1/offers/{offerId} | Delete a specific offer by its ID|
|[**apiV1OffersOfferIdGet**](#apiv1offersofferidget) | **GET** /api/v1/offers/{offerId} | Retrieve a specific offer by its ID|
|[**apiV1OffersOfferIdPatch**](#apiv1offersofferidpatch) | **PATCH** /api/v1/offers/{offerId} | Update a specific offer by its ID|

# **apiV1FlowsFlowIdOffersGet**
> ApiV1FlowsFlowIdOffersGet200Response apiV1FlowsFlowIdOffersGet()


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let flowId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1FlowsFlowIdOffersGet(
    flowId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1FlowsFlowIdOffersGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Offers retrieved successfully |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsFlowIdOffersPost**
> Offers apiV1FlowsFlowIdOffersPost(body)


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let flowId: string; // (default to undefined)
let body: Offers; //

const { status, data } = await apiInstance.apiV1FlowsFlowIdOffersPost(
    flowId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **Offers**|  | |
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**Offers**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Offer created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OffersOfferIdConditionGroupsGet**
> ApiV1OptionsOptionIdConditionGroupsGet200Response apiV1OffersOfferIdConditionGroupsGet()


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let offerId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OffersOfferIdConditionGroupsGet(
    offerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offerId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1OptionsOptionIdConditionGroupsGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of condition groups retrieved successfully |  -  |
|**404** | Offer not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OffersOfferIdConditionGroupsPost**
> ConditionGroups apiV1OffersOfferIdConditionGroupsPost(conditionGroups)


### Example

```typescript
import {
    OffersApi,
    Configuration,
    ConditionGroups
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let offerId: string; // (default to undefined)
let conditionGroups: ConditionGroups; //

const { status, data } = await apiInstance.apiV1OffersOfferIdConditionGroupsPost(
    offerId,
    conditionGroups
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionGroups** | **ConditionGroups**|  | |
| **offerId** | [**string**] |  | defaults to undefined|


### Return type

**ConditionGroups**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Condition group created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Offer not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OffersOfferIdDelete**
> apiV1OffersOfferIdDelete()


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let offerId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OffersOfferIdDelete(
    offerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offerId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Offer deleted successfully |  -  |
|**404** | Offer not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OffersOfferIdGet**
> Offers apiV1OffersOfferIdGet()


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let offerId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OffersOfferIdGet(
    offerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offerId** | [**string**] |  | defaults to undefined|


### Return type

**Offers**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Offer retrieved successfully |  -  |
|**404** | Offer not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OffersOfferIdPatch**
> Offers apiV1OffersOfferIdPatch(body)


### Example

```typescript
import {
    OffersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OffersApi(configuration);

let offerId: string; // (default to undefined)
let body: Offers; //

const { status, data } = await apiInstance.apiV1OffersOfferIdPatch(
    offerId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **Offers**|  | |
| **offerId** | [**string**] |  | defaults to undefined|


### Return type

**Offers**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Offer updated successfully |  -  |
|**404** | Offer not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

