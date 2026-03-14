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
    public partial class ConditionGroupsApi
    { 
        [FunctionName("ConditionGroupsApi_ApiV1EdgesEdgeIdConditionGroupsGet")]
        public async Task<ActionResult<ApiV1EdgesEdgeIdConditionGroupsGet200Response>> _ApiV1EdgesEdgeIdConditionGroupsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/edges/{edgeId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string edgeId)
        {
            var method = this.GetType().GetMethod("ApiV1EdgesEdgeIdConditionGroupsGet");
            return method != null
                ? (await ((Task<ApiV1EdgesEdgeIdConditionGroupsGet200Response>)method.Invoke(this, new object[] { req, context, edgeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionGroupsApi_ApiV1EdgesEdgeIdConditionGroupsPost")]
        public async Task<ActionResult<ConditionGroups>> _ApiV1EdgesEdgeIdConditionGroupsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/edges/{edgeId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string edgeId)
        {
            var method = this.GetType().GetMethod("ApiV1EdgesEdgeIdConditionGroupsPost");
            return method != null
                ? (await ((Task<ConditionGroups>)method.Invoke(this, new object[] { req, context, edgeId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionGroupsApi_ApiV1OptionsOptionIdConditionGroupsGet")]
        public async Task<ActionResult<ApiV1OptionsOptionIdConditionGroupsGet200Response>> _ApiV1OptionsOptionIdConditionGroupsGet([HttpTrigger(AuthorizationLevel.Anonymous, "Get", Route = "api/v1/options/{optionId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string optionId)
        {
            var method = this.GetType().GetMethod("ApiV1OptionsOptionIdConditionGroupsGet");
            return method != null
                ? (await ((Task<ApiV1OptionsOptionIdConditionGroupsGet200Response>)method.Invoke(this, new object[] { req, context, optionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }

        [FunctionName("ConditionGroupsApi_ApiV1OptionsOptionIdConditionGroupsPost")]
        public async Task<ActionResult<ConditionGroups>> _ApiV1OptionsOptionIdConditionGroupsPost([HttpTrigger(AuthorizationLevel.Anonymous, "Post", Route = "api/v1/options/{optionId}/condition-groups")]HttpRequest req, ExecutionContext context, [RegularExpression("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")]string optionId)
        {
            var method = this.GetType().GetMethod("ApiV1OptionsOptionIdConditionGroupsPost");
            return method != null
                ? (await ((Task<ConditionGroups>)method.Invoke(this, new object[] { req, context, optionId })).ConfigureAwait(false))
                : new StatusCodeResult((int)HttpStatusCode.NotImplemented);
        }
    }
}
