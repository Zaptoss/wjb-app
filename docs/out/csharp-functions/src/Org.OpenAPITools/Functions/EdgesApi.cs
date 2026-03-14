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
    public partial class EdgesApi
    { 
        [FunctionName("EdgesApi_ApiV1EdgesEdgeIdDelete")]
        public async Task<ActionResult<>> _ApiV1EdgesEdgeIdDelete([HttpTrigger(AuthorizationLevel.Anonymous, "Delete", Route = "api/v1/edges/{edgeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string edgeId)
        {
            var method = this.GetType().GetMethod("ApiV1EdgesEdgeIdDelete");
            return method != null
                ? (await ((Task<>)method.Invoke(this, new object[] { req, context, edgeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("EdgesApi_ApiV1EdgesEdgeIdGet")]
        public async Task<ActionResult<ApiV1EdgesEdgeIdGet200Response>> _ApiV1EdgesEdgeIdGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/edges/{edgeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string edgeId)
        {
            var method = this.GetType().GetMethod("ApiV1EdgesEdgeIdGet");
            return method != null
                ? (await ((Task<ApiV1EdgesEdgeIdGet200Response>)method.Invoke(this, new object[] { req, context, edgeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("EdgesApi_ApiV1EdgesEdgeIdPatch")]
        public async Task<ActionResult<ApiV1EdgesEdgeIdGet200Response>> _ApiV1EdgesEdgeIdPatch([HttpTrigger(AuthorizationLevel.Anonymous, "Patch", Route = "api/v1/edges/{edgeId}")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string edgeId)
        {
            var method = this.GetType().GetMethod("ApiV1EdgesEdgeIdPatch");
            return method != null
                ? (await ((Task<ApiV1EdgesEdgeIdGet200Response>)method.Invoke(this, new object[] { req, context, edgeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
