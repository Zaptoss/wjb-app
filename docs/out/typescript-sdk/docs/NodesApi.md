# NodesApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1FlowsFlowIdNodesGet**](#apiv1flowsflowidnodesget) | **GET** /api/v1/flows/{flowId}/nodes | Retrieve a list of nodes within a specific flow|
|[**apiV1FlowsFlowIdNodesPost**](#apiv1flowsflowidnodespost) | **POST** /api/v1/flows/{flowId}/nodes | Create a new node within a specific flow|
|[**apiV1NodesNodeIdDelete**](#apiv1nodesnodeiddelete) | **DELETE** /api/v1/nodes/{nodeId} | Delete a specific node by its ID|
|[**apiV1NodesNodeIdGet**](#apiv1nodesnodeidget) | **GET** /api/v1/nodes/{nodeId} | Retrieve a specific node by its ID|
|[**apiV1NodesNodeIdPatch**](#apiv1nodesnodeidpatch) | **PATCH** /api/v1/nodes/{nodeId} | Update a specific node by its ID|

# **apiV1FlowsFlowIdNodesGet**
> ApiV1FlowsFlowIdNodesGet200Response apiV1FlowsFlowIdNodesGet()


### Example

```typescript
import {
    NodesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodesApi(configuration);

let flowId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1FlowsFlowIdNodesGet(
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

# **apiV1FlowsFlowIdNodesPost**
> Nodes apiV1FlowsFlowIdNodesPost(body)


### Example

```typescript
import {
    NodesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodesApi(configuration);

let flowId: string; // (default to undefined)
let body: Nodes; //

const { status, data } = await apiInstance.apiV1FlowsFlowIdNodesPost(
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

# **apiV1NodesNodeIdDelete**
> apiV1NodesNodeIdDelete()


### Example

```typescript
import {
    NodesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodesApi(configuration);

let nodeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1NodesNodeIdDelete(
    nodeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nodeId** | [**string**] |  | defaults to undefined|


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
|**204** | Nodes deleted successfully |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1NodesNodeIdGet**
> ApiV1FlowsFlowIdNodesGet200Response apiV1NodesNodeIdGet()


### Example

```typescript
import {
    NodesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NodesApi(configuration);

let nodeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1NodesNodeIdGet(
    nodeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nodeId** | [**string**] |  | defaults to undefined|


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

# **apiV1NodesNodeIdPatch**
> ApiV1FlowsFlowIdNodesGet200Response apiV1NodesNodeIdPatch(apiV1FlowsFlowIdNodesGet200Response)


### Example

```typescript
import {
    NodesApi,
    Configuration,
    ApiV1FlowsFlowIdNodesGet200Response
} from './api';

const configuration = new Configuration();
const apiInstance = new NodesApi(configuration);

let nodeId: string; // (default to undefined)
let apiV1FlowsFlowIdNodesGet200Response: ApiV1FlowsFlowIdNodesGet200Response; //

const { status, data } = await apiInstance.apiV1NodesNodeIdPatch(
    nodeId,
    apiV1FlowsFlowIdNodesGet200Response
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiV1FlowsFlowIdNodesGet200Response** | **ApiV1FlowsFlowIdNodesGet200Response**|  | |
| **nodeId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1FlowsFlowIdNodesGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Nodes updated successfully |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

