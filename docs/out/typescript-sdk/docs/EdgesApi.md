# EdgesApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1EdgesEdgeIdDelete**](#apiv1edgesedgeiddelete) | **DELETE** /api/v1/edges/{edgeId} | Delete edge|
|[**apiV1EdgesEdgeIdGet**](#apiv1edgesedgeidget) | **GET** /api/v1/edges/{edgeId} | Retrieve a list of edges within a specific flow|
|[**apiV1EdgesEdgeIdPatch**](#apiv1edgesedgeidpatch) | **PATCH** /api/v1/edges/{edgeId} | Update edge attributes|

# **apiV1EdgesEdgeIdDelete**
> apiV1EdgesEdgeIdDelete()


### Example

```typescript
import {
    EdgesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgesApi(configuration);

let edgeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EdgesEdgeIdDelete(
    edgeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **edgeId** | [**string**] |  | defaults to undefined|


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
|**204** | Edge deleted successfully |  -  |
|**404** | Edge not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EdgesEdgeIdGet**
> ApiV1EdgesEdgeIdGet200Response apiV1EdgesEdgeIdGet()


### Example

```typescript
import {
    EdgesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgesApi(configuration);

let edgeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EdgesEdgeIdGet(
    edgeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **edgeId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1EdgesEdgeIdGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Edges retrieved successfully |  -  |
|**404** | Flow not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EdgesEdgeIdPatch**
> ApiV1EdgesEdgeIdGet200Response apiV1EdgesEdgeIdPatch(apiV1EdgesEdgeIdPatchRequest)


### Example

```typescript
import {
    EdgesApi,
    Configuration,
    ApiV1EdgesEdgeIdPatchRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new EdgesApi(configuration);

let edgeId: string; // (default to undefined)
let apiV1EdgesEdgeIdPatchRequest: ApiV1EdgesEdgeIdPatchRequest; //

const { status, data } = await apiInstance.apiV1EdgesEdgeIdPatch(
    edgeId,
    apiV1EdgesEdgeIdPatchRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiV1EdgesEdgeIdPatchRequest** | **ApiV1EdgesEdgeIdPatchRequest**|  | |
| **edgeId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1EdgesEdgeIdGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Edge updated successfully |  -  |
|**404** | Edge not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

