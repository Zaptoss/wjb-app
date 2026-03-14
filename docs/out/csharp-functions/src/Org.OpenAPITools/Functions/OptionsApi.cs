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
    public partial class OptionsApi
    { 
        [FunctionName("OptionsApi_ApiV1NodesNodeIdOptionsGet")]
        public async Task<ActionResult<ApiV1NodesNodeIdOptionsGet200Response>> _ApiV1NodesNodeIdOptionsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/nodes/{nodeId}/options")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string nodeId)
        {
            var method = this.GetType().GetMethod("ApiV1NodesNodeIdOptionsGet");
            return method != null
                ? (await ((Task<ApiV1NodesNodeIdOptionsGet200Response>)method.Invoke(this, new object[] { req, context, nodeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OptionsApi_ApiV1NodesNodeIdOptionsPost")]
        public async Task<ActionResult<Options>> _ApiV1NodesNodeIdOptionsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/nodes/{nodeId}/options")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string nodeId)
        {
            var method = this.GetType().GetMethod("ApiV1NodesNodeIdOptionsPost");
            return method != null
                ? (await ((Task<Options>)method.Invoke(this, new object[] { req, context, nodeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OptionsApi_ApiV1OptionsOptionIdDelete")]
        public async Task<ActionResult<>> _ApiV1OptionsOptionIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/options/{optionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string optionId)
        {
            var method = this.GetType().GetMethod("ApiV1OptionsOptionIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, optionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OptionsApi_ApiV1OptionsOptionIdGet")]
        public async Task<ActionResult<Options>> _ApiV1OptionsOptionIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/options/{optionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string optionId)
        {
            var method = this.GetType().GetMethod("ApiV1OptionsOptionIdGet");
            return method != null
                ? (await ((Task<Options>)method.Invoke(this, new object[] { req, context, optionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("OptionsApi_ApiV1OptionsOptionIdPatch")]
        public async Task<ActionResult<Options>> _ApiV1OptionsOptionIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/options/{optionId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string optionId)
        {
            var method = this.GetType().GetMethod("ApiV1OptionsOptionIdPatch");
            return method != null
                ? (await ((Task<Options>)method.Invoke(this, new object[] { req, context, optionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
