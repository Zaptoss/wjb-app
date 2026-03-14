using System.IO;
using System.Net;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Org.OpenAPITools.Models;

namespace Org.OpenAPITools.Functions
{ 
    public partial class FlowsApi
    { 
        [FunctionName("FlowsApi_ApiV1FlowsFlowIdDelete")]
        public async Task<ActionResult<>> _ApiV1FlowsFlowIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/flows/{flowId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsFlowIdEdgesGet")]
        public async Task<ActionResult<ApiV1FlowsFlowIdNodesGet200Response>> _ApiV1FlowsFlowIdEdgesGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/flows/{flowId}/edges")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdEdgesGet");
            return method != null
                ? (await ((Task<ApiV1FlowsFlowIdNodesGet200Response>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsFlowIdEdgesPost")]
        public async Task<ActionResult<Nodes>> _ApiV1FlowsFlowIdEdgesPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/flows/{flowId}/edges")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdEdgesPost");
            return method != null
                ? (await ((Task<Nodes>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsFlowIdGet")]
        public async Task<ActionResult<Flows>> _ApiV1FlowsFlowIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/flows/{flowId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdGet");
            return method != null
                ? (await ((Task<Flows>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsFlowIdPatch")]
        public async Task<ActionResult<Flows>> _ApiV1FlowsFlowIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/flows/{flowId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdPatch");
            return method != null
                ? (await ((Task<Flows>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsGet")]
        public async Task<ActionResult<ApiV1FlowsGet200Response>> _ApiV1FlowsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/flows")]HttpRequest req, ExecutionContext context)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsGet");
            return method != null
                ? (await ((Task<ApiV1FlowsGet200Response>)method.Invoke(this, new object[] { req, context })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("FlowsApi_ApiV1FlowsPost")]
        public async Task<ActionResult<ApiV1FlowsPost201Response>> _ApiV1FlowsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/flows")]HttpRequest req, ExecutionContext context)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsPost");
            return method != null
                ? (await ((Task<ApiV1FlowsPost201Response>)method.Invoke(this, new object[] { req, context })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
