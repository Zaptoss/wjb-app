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
    public partial class NodesApi
    { 
        [FunctionName("NodesApi_ApiV1FlowsFlowIdNodesGet")]
        public async Task<ActionResult<ApiV1FlowsFlowIdNodesGet200Response>> _ApiV1FlowsFlowIdNodesGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/flows/{flowId}/nodes")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdNodesGet");
            return method != null
                ? (await ((Task<ApiV1FlowsFlowIdNodesGet200Response>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("NodesApi_ApiV1FlowsFlowIdNodesPost")]
        public async Task<ActionResult<Nodes>> _ApiV1FlowsFlowIdNodesPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/flows/{flowId}/nodes")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string flowId)
        {
            var method = this.GetType().GetMethod("ApiV1FlowsFlowIdNodesPost");
            return method != null
                ? (await ((Task<Nodes>)method.Invoke(this, new object[] { req, context, flowId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("NodesApi_ApiV1NodesNodeIdDelete")]
        public async Task<ActionResult<>> _ApiV1NodesNodeIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/nodes/{nodeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string nodeId)
        {
            var method = this.GetType().GetMethod("ApiV1NodesNodeIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, nodeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("NodesApi_ApiV1NodesNodeIdGet")]
        public async Task<ActionResult<ApiV1FlowsFlowIdNodesGet200Response>> _ApiV1NodesNodeIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/nodes/{nodeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string nodeId)
        {
            var method = this.GetType().GetMethod("ApiV1NodesNodeIdGet");
            return method != null
                ? (await ((Task<ApiV1FlowsFlowIdNodesGet200Response>)method.Invoke(this, new object[] { req, context, nodeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("NodesApi_ApiV1NodesNodeIdPatch")]
        public async Task<ActionResult<ApiV1FlowsFlowIdNodesGet200Response>> _ApiV1NodesNodeIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/nodes/{nodeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string nodeId)
        {
            var method = this.GetType().GetMethod("ApiV1NodesNodeIdPatch");
            return method != null
                ? (await ((Task<ApiV1FlowsFlowIdNodesGet200Response>)method.Invoke(this, new object[] { req, context, nodeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
