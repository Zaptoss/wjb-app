# ConditionGroupsApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1EdgesEdgeIdConditionGroupsGet**](#apiv1edgesedgeidconditiongroupsget) | **GET** /api/v1/edges/{edgeId}/condition-groups | Retrieve a list of condition groups for a specific edge|
|[**apiV1EdgesEdgeIdConditionGroupsPost**](#apiv1edgesedgeidconditiongroupspost) | **POST** /api/v1/edges/{edgeId}/condition-groups | Create a new condition group for a specific edge|
|[**apiV1OptionsOptionIdConditionGroupsGet**](#apiv1optionsoptionidconditiongroupsget) | **GET** /api/v1/options/{optionId}/condition-groups | Retrieve a list of condition groups for a specific option|
|[**apiV1OptionsOptionIdConditionGroupsPost**](#apiv1optionsoptionidconditiongroupspost) | **POST** /api/v1/options/{optionId}/condition-groups | Create a new condition group for a specific option|

# **apiV1EdgesEdgeIdConditionGroupsGet**
> ApiV1EdgesEdgeIdConditionGroupsGet200Response apiV1EdgesEdgeIdConditionGroupsGet()


### Example

```typescript
import {
    ConditionGroupsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionGroupsApi(configuration);

let edgeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EdgesEdgeIdConditionGroupsGet(
    edgeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **edgeId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1EdgesEdgeIdConditionGroupsGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of condition groups retrieved successfully |  -  |
|**404** | Edge not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EdgesEdgeIdConditionGroupsPost**
> ConditionGroups apiV1EdgesEdgeIdConditionGroupsPost(body)


### Example

```typescript
import {
    ConditionGroupsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionGroupsApi(configuration);

let edgeId: string; // (default to undefined)
let body: ConditionGroups; //

const { status, data } = await apiInstance.apiV1EdgesEdgeIdConditionGroupsPost(
    edgeId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **ConditionGroups**|  | |
| **edgeId** | [**string**] |  | defaults to undefined|


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OptionsOptionIdConditionGroupsGet**
> ApiV1OptionsOptionIdConditionGroupsGet200Response apiV1OptionsOptionIdConditionGroupsGet()


### Example

```typescript
import {
    ConditionGroupsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionGroupsApi(configuration);

let optionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OptionsOptionIdConditionGroupsGet(
    optionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optionId** | [**string**] |  | defaults to undefined|


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
|**404** | Option not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OptionsOptionIdConditionGroupsPost**
> ConditionGroups apiV1OptionsOptionIdConditionGroupsPost(conditionGroups)


### Example

```typescript
import {
    ConditionGroupsApi,
    Configuration,
    ConditionGroups
} from './api';

const configuration = new Configuration();
const apiInstance = new ConditionGroupsApi(configuration);

let optionId: string; // (default to undefined)
let conditionGroups: ConditionGroups; //

const { status, data } = await apiInstance.apiV1OptionsOptionIdConditionGroupsPost(
    optionId,
    conditionGroups
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **conditionGroups** | **ConditionGroups**|  | |
| **optionId** | [**string**] |  | defaults to undefined|


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
|**404** | Option not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

