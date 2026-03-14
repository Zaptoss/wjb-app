# FlowsApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1FlowsFlowIdDelete**](#apiv1flowsflowiddelete) | **DELETE** /api/v1/flows/{flowId} | Delete a specific flow by its ID|
|[**apiV1FlowsFlowIdEdgesGet**](#apiv1flowsflowidedgesget) | **GET** /api/v1/flows/{flowId}/edges | Retrieve a list of nodes within a specific flow|
|[**apiV1FlowsFlowIdEdgesPost**](#apiv1flowsflowidedgespost) | **POST** /api/v1/flows/{flowId}/edges | Create a new node within a specific flow|
|[**apiV1FlowsFlowIdGet**](#apiv1flowsflowidget) | **GET** /api/v1/flows/{flowId} | Retrieve a specific flow by its ID|
|[**apiV1FlowsFlowIdPatch**](#apiv1flowsflowidpatch) | **PATCH** /api/v1/flows/{flowId} | Update a specific flow by its ID|
|[**apiV1FlowsGet**](#apiv1flowsget) | **GET** /api/v1/flows | Retrieve a list of flows|
|[**apiV1FlowsPost**](#apiv1flowspost) | **POST** /api/v1/flows | Create a new flow|

# **apiV1FlowsFlowIdDelete**
> apiV1FlowsFlowIdDelete()


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let flowId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1FlowsFlowIdDelete(
    flowId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flowId** | [**string**] |  | defaults to undefined|


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
|**204** | Flow deleted successfully |  -  |
|**404** | Flow not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsFlowIdEdgesGet**
> ApiV1FlowsFlowIdNodesGet200Response apiV1FlowsFlowIdEdgesGet()


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let flowId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1FlowsFlowIdEdgesGet(
    flowId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1FlowsFlowIdNodesGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Nodes retrieved successfully |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsFlowIdEdgesPost**
> Nodes apiV1FlowsFlowIdEdgesPost(body)


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let flowId: string; // (default to undefined)
let body: Nodes; //

const { status, data } = await apiInstance.apiV1FlowsFlowIdEdgesPost(
    flowId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **Nodes**|  | |
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**Nodes**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Node created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsFlowIdGet**
> Flows apiV1FlowsFlowIdGet()


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let flowId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1FlowsFlowIdGet(
    flowId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**Flows**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Flow retrieved successfully |  -  |
|**404** | Flow not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsFlowIdPatch**
> Flows apiV1FlowsFlowIdPatch(body)


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let flowId: string; // (default to undefined)
let body: Flows; //

const { status, data } = await apiInstance.apiV1FlowsFlowIdPatch(
    flowId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **Flows**|  | |
| **flowId** | [**string**] |  | defaults to undefined|


### Return type

**Flows**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Flow updated successfully |  -  |
|**404** | Flow not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsGet**
> ApiV1FlowsGet200Response apiV1FlowsGet()


### Example

```typescript
import {
    FlowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let page: number; //Page number for pagination (optional) (default to 1)
let limit: number; //Number of items per page for pagination (optional) (default to 10)

const { status, data } = await apiInstance.apiV1FlowsGet(
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number for pagination | (optional) defaults to 1|
| **limit** | [**number**] | Number of items per page for pagination | (optional) defaults to 10|


### Return type

**ApiV1FlowsGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A list of flows retrieved successfully |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1FlowsPost**
> ApiV1FlowsPost201Response apiV1FlowsPost(apiV1FlowsPostRequest)


### Example

```typescript
import {
    FlowsApi,
    Configuration,
    ApiV1FlowsPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FlowsApi(configuration);

let apiV1FlowsPostRequest: ApiV1FlowsPostRequest; //

const { status, data } = await apiInstance.apiV1FlowsPost(
    apiV1FlowsPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiV1FlowsPostRequest** | **ApiV1FlowsPostRequest**|  | |


### Return type

**ApiV1FlowsPost201Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Flow created successfully |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

