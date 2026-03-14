# OptionsApi

All URIs are relative to *https://wjb-api.brainybobs.xyz*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1NodesNodeIdOptionsGet**](#apiv1nodesnodeidoptionsget) | **GET** /api/v1/nodes/{nodeId}/options | Retrieve a list of options for a specific node|
|[**apiV1NodesNodeIdOptionsPost**](#apiv1nodesnodeidoptionspost) | **POST** /api/v1/nodes/{nodeId}/options | Create a new option for a specific node|
|[**apiV1OptionsOptionIdDelete**](#apiv1optionsoptioniddelete) | **DELETE** /api/v1/options/{optionId} | Delete a specific option by its ID|
|[**apiV1OptionsOptionIdGet**](#apiv1optionsoptionidget) | **GET** /api/v1/options/{optionId} | Retrieve a specific option by its ID|
|[**apiV1OptionsOptionIdPatch**](#apiv1optionsoptionidpatch) | **PATCH** /api/v1/options/{optionId} | Update a specific option by its ID|

# **apiV1NodesNodeIdOptionsGet**
> ApiV1NodesNodeIdOptionsGet200Response apiV1NodesNodeIdOptionsGet()


### Example

```typescript
import {
    OptionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OptionsApi(configuration);

let nodeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1NodesNodeIdOptionsGet(
    nodeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nodeId** | [**string**] |  | defaults to undefined|


### Return type

**ApiV1NodesNodeIdOptionsGet200Response**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Options retrieved successfully |  -  |
|**404** | Node not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1NodesNodeIdOptionsPost**
> Options apiV1NodesNodeIdOptionsPost(_options)


### Example

```typescript
import {
    OptionsApi,
    Configuration,
    Options
} from './api';

const configuration = new Configuration();
const apiInstance = new OptionsApi(configuration);

let nodeId: string; // (default to undefined)
let _options: Options; //

const { status, data } = await apiInstance.apiV1NodesNodeIdOptionsPost(
    nodeId,
    _options
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **_options** | **Options**|  | |
| **nodeId** | [**string**] |  | defaults to undefined|


### Return type

**Options**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Option created successfully |  -  |
|**400** | Bad request |  -  |
|**404** | Node not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OptionsOptionIdDelete**
> apiV1OptionsOptionIdDelete()


### Example

```typescript
import {
    OptionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OptionsApi(configuration);

let optionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OptionsOptionIdDelete(
    optionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optionId** | [**string**] |  | defaults to undefined|


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
|**204** | Option deleted successfully |  -  |
|**404** | Option not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OptionsOptionIdGet**
> Options apiV1OptionsOptionIdGet()


### Example

```typescript
import {
    OptionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new OptionsApi(configuration);

let optionId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1OptionsOptionIdGet(
    optionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **optionId** | [**string**] |  | defaults to undefined|


### Return type

**Options**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Option retrieved successfully |  -  |
|**404** | Option not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1OptionsOptionIdPatch**
> Options apiV1OptionsOptionIdPatch(_options)


### Example

```typescript
import {
    OptionsApi,
    Configuration,
    Options
} from './api';

const configuration = new Configuration();
const apiInstance = new OptionsApi(configuration);

let optionId: string; // (default to undefined)
let _options: Options; //

const { status, data } = await apiInstance.apiV1OptionsOptionIdPatch(
    optionId,
    _options
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **_options** | **Options**|  | |
| **optionId** | [**string**] |  | defaults to undefined|


### Return type

**Options**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Option updated successfully |  -  |
|**404** | Option not found |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

