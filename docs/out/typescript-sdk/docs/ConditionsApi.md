# ConditionsApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1ConditionGroupsConditionGroupIdConditionsGet**](#apiv1conditiongroupsconditiongroupidconditionsget) | **GET** /api/v1/condition-groups/{conditionGroupId}/conditions | Retrieve a list of conditions for a specific condition group|
|[**apiV1ConditionGroupsConditionGroupIdConditionsPost**](#apiv1conditiongroupsconditiongroupidconditionspost) | **POST** /api/v1/condition-groups/{conditionGroupId}/conditions | Create a new condition for a specific condition group|
|[**apiV1ConditionGroupsConditionGroupIdGet**](#apiv1conditiongroupsconditiongroupidget) | **GET** /api/v1/condition-groups/{conditionGroupId} | Retrieve a list of conditions for a specific condition group|
|[**apiV1ConditionGroupsConditionGroupIdPost**](#apiv1conditiongroupsconditiongroupidpost) | **POST** /api/v1/condition-groups/{conditionGroupId} | Create a new condition for a specific edge|
|[**apiV1ConditionsConditionIdDelete**](#apiv1conditionsconditioniddelete) | **DELETE** /api/v1/conditions/{conditionId} | Delete a specific condition by its ID|
|[**apiV1ConditionsConditionIdGet**](#apiv1conditionsconditionidget) | **GET** /api/v1/conditions/{conditionId} | Retrieve a specific condition by its ID|
|[**apiV1ConditionsConditionIdPatch**](#apiv1conditionsconditionidpatch) | **PATCH** /api/v1/conditions/{conditionId} | Update a specific condition by its ID|

# **apiV1ConditionGroupsConditionGroupIdConditionsGet**
> ApiV1ConditionGroupsConditionGroupIdConditionsGet200Response apiV1ConditionGroupsConditionGroupIdConditionsGet()


### Example

```typescript
import {
    ConditionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionGroupId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ConditionGroupsConditionGroupIdConditionsGet(
    conditionGroupId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionGroupId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1ConditionGroupsConditionGroupIdConditionsGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of conditions retrieved successfully |  -  |
|**404** | Condition group not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionGroupsConditionGroupIdConditionsPost**
> Conditions apiV1ConditionGroupsConditionGroupIdConditionsPost(conditions)


### Example

```typescript
import {
    ConditionsApi,
    Configuration,
    Conditions
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionGroupId: string; // (default to undefined)
let conditions: Conditions; //

const { status, data } = await apiInstance.apiV1ConditionGroupsConditionGroupIdConditionsPost(
    conditionGroupId,
    conditions
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditions** | **Conditions**|  | |
| **conditionGroupId** | [**string**] |  | defaults to undefined|


### Return type

**Conditions**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Condition created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Condition group not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionGroupsConditionGroupIdGet**
> ApiV1ConditionGroupsConditionGroupIdGet200Response apiV1ConditionGroupsConditionGroupIdGet()


### Example

```typescript
import {
    ConditionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionGroupId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ConditionGroupsConditionGroupIdGet(
    conditionGroupId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionGroupId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1ConditionGroupsConditionGroupIdGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of conditions retrieved successfully |  -  |
|**404** | Condition group not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionGroupsConditionGroupIdPost**
> Conditions apiV1ConditionGroupsConditionGroupIdPost(body)


### Example

```typescript
import {
    ConditionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionGroupId: string; // (default to undefined)
let body: Conditions; //

const { status, data } = await apiInstance.apiV1ConditionGroupsConditionGroupIdPost(
    conditionGroupId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **Conditions**|  | |
| **conditionGroupId** | [**string**] |  | defaults to undefined|


### Return type

**Conditions**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Condition created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Condition group not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionsConditionIdDelete**
> apiV1ConditionsConditionIdDelete()


### Example

```typescript
import {
    ConditionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ConditionsConditionIdDelete(
    conditionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionId** | [**string**] |  | defaults to undefined|


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
|**204** | Condition deleted successfully |  -  |
|**404** | Condition not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionsConditionIdGet**
> Conditions apiV1ConditionsConditionIdGet()


### Example

```typescript
import {
    ConditionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ConditionsConditionIdGet(
    conditionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionId** | [**string**] |  | defaults to undefined|


### Return type

**Conditions**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Condition retrieved successfully |  -  |
|**404** | Condition not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ConditionsConditionIdPatch**
> Conditions apiV1ConditionsConditionIdPatch(conditions)


### Example

```typescript
import {
    ConditionsApi,
    Configuration,
    Conditions
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionsApi(configuration);

let conditionId: string; // (default to undefined)
let conditions: Conditions; //

const { status, data } = await apiInstance.apiV1ConditionsConditionIdPatch(
    conditionId,
    conditions
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditions** | **Conditions**|  | |
| **conditionId** | [**string**] |  | defaults to undefined|


### Return type

**Conditions**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Condition updated successfully |  -  |
|**404** | Condition not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

